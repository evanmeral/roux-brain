// Calendar feeds: Google Calendar secret iCal addresses (read-only by design), parsed with node-ical.
// Cached 5 minutes per feed; a failed refresh keeps the last good copy and reports the error.
'use strict';
const fs = require('fs');
const ical = require('node-ical');

const TTL_MS = 5 * 60 * 1000;
const cache = new Map(); // url -> { fetchedAt, events, error }

function invalidate() { cache.clear(); }

async function loadFeed(url) {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.fetchedAt < TTL_MS && !hit.error) return hit;
  try {
    let data;
    if (/^https?:/i.test(url)) {
      const ac = new AbortController();
      const t = setTimeout(() => ac.abort(), 15000);
      try { data = await ical.async.fromURL(url, { signal: ac.signal, headers: { 'User-Agent': 'AtlasOS/0.1' } }); }
      finally { clearTimeout(t); }
    } else {
      data = await ical.async.parseFile(url.replace(/^file:\/\//, ''));
    }
    const events = Object.values(data).filter((e) => e && e.type === 'VEVENT');
    const entry = { fetchedAt: Date.now(), events, error: null };
    cache.set(url, entry);
    return entry;
  } catch (e) {
    const entry = { fetchedAt: Date.now(), events: hit ? hit.events : [], error: e.message || String(e), stale: !!hit };
    cache.set(url, entry);
    return entry;
  }
}

// Date parts in a timezone.
function parts(d, tz) {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short' }).formatToParts(d);
  const g = (t) => (p.find((x) => x.type === t) || {}).value;
  return { iso: `${g('year')}-${g('month')}-${g('day')}`, hh: Number(g('hour')) % 24, mm: Number(g('minute')), weekday: g('weekday') };
}
function addDays(iso, n) {
  const d = new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10) + n));
  return d.toISOString().slice(0, 10);
}
// Weekday index (0 = Sunday) of an ISO date, calendar-wise.
function dow(iso) { return new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10))).getUTCDay(); }
// UTC instant of local midnight in tz for an ISO date (two-pass offset).
function zonedMidnight(iso, tz) {
  const guess = Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  const off = (t) => { const p = parts(new Date(t), tz); return (Date.UTC(+p.iso.slice(0, 4), +p.iso.slice(5, 7) - 1, +p.iso.slice(8, 10), p.hh, p.mm) - t); };
  const first = guess - off(guess);
  return new Date(first - off(first) + (guess - first) + (first - guess));
}
function fmtTime(hh, mm) {
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  const ap = hh < 12 ? 'a' : 'p';
  return mm ? `${h12}:${String(mm).padStart(2, '0')}${ap}` : `${h12}${ap}`;
}

async function getWeek(calendars, anchorIso, tz, weekStartsOn = 1) {
  const shift = (dow(anchorIso) - weekStartsOn + 7) % 7;
  const startIso = addDays(anchorIso, -shift);
  const days = Array.from({ length: 7 }, (_, i) => addDays(startIso, i));
  const rangeStart = zonedMidnight(days[0], tz);
  const rangeEnd = zonedMidnight(addDays(days[6], 1), tz);
  const byDay = Object.fromEntries(days.map((d) => [d, []]));
  const feeds = [];

  for (const cal of calendars || []) {
    const url = (cal.url || '').trim();
    if (!url || /^PASTE/i.test(url)) { feeds.push({ name: cal.name, color: cal.color, ok: false, error: 'not configured' }); continue; }
    const feed = await loadFeed(url);
    feeds.push({ name: cal.name, color: cal.color, ok: !feed.error, error: feed.error, stale: !!feed.stale, fetchedAt: new Date(feed.fetchedAt).toISOString(), count: feed.events.length });
    for (const ev of feed.events) {
      let instances;
      try {
        instances = ical.expandRecurringEvent(ev, { from: new Date(rangeStart.getTime() - 86400000), to: new Date(rangeEnd.getTime() + 86400000), expandOngoing: true });
      } catch (e) { instances = ev.start ? [{ start: ev.start, end: ev.end, summary: ev.summary, isFullDay: ev.datetype === 'date' }] : []; }
      for (const inst of instances) {
        if (!inst.start) continue;
        const allDay = inst.isFullDay || inst.start.dateOnly === true || ev.datetype === 'date';
        const start = new Date(inst.start);
        const end = inst.end ? new Date(inst.end) : new Date(start.getTime() + (allDay ? 86400000 : 3600000));
        if (end <= rangeStart || start >= rangeEnd) continue;
        const summary = (inst.summary || ev.summary || '(no title)').toString();
        if (allDay) {
          // All-day: the calendar day in the event's own timezone (or ours), spanning end-exclusive.
          const evTz = (inst.start && inst.start.tz) || tz;
          const s = parts(start, evTz).iso;
          const eP = parts(new Date(end.getTime() - 1), evTz).iso;
          for (let d = s; d <= eP; d = addDays(d, 1)) if (byDay[d]) byDay[d].push({ allDay: true, summary, calendar: cal.name, color: cal.color, spanStart: d === s, spanEnd: d === eP });
        } else {
          const sp = parts(start, tz), ep = parts(end, tz);
          if (byDay[sp.iso]) byDay[sp.iso].push({ allDay: false, summary, calendar: cal.name, color: cal.color, start: start.toISOString(), end: end.toISOString(), time: fmtTime(sp.hh, sp.mm), endTime: fmtTime(ep.hh, ep.mm), minutes: sp.hh * 60 + sp.mm, location: inst.location || ev.location || null });
        }
      }
    }
  }
  for (const d of days) byDay[d].sort((a, b) => (a.allDay === b.allDay ? (a.minutes || 0) - (b.minutes || 0) : a.allDay ? -1 : 1));
  return { start: days[0], end: days[6], days, byDay, feeds, timezone: tz, generatedAt: new Date().toISOString() };
}

module.exports = { getWeek, invalidate };
