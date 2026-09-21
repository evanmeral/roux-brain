ObjC.import('Foundation'); ObjC.import('Vision'); ObjC.import('CoreImage');
function run(argv){
  var url=$.NSURL.fileURLWithPath(argv[0]);
  var ci=$.CIImage.imageWithContentsOfURL(url);
  var req=$.VNGenerateForegroundInstanceMaskRequest.alloc.init;
  var h=$.VNImageRequestHandler.alloc.initWithCIImageOptions(ci, $({}));
  var err=Ref();
  var ok=h.performRequestsError($([req]), err);
  if(!ok) return 'perform failed';
  var res=req.results; if(res.count==0) return 'no subject';
  var r=res.objectAtIndex(0);
  var buf=r.generateMaskedImageOfInstancesFromRequestHandlerCroppedToInstancesExtentError(r.allInstances, h, false, err);
  var out=$.CIImage.imageWithCVPixelBuffer(buf);
  var ctx=$.CIContext.context;
  var cs=ci.colorSpace;
  ctx.writePNGRepresentationOfImageToURLFormatColorSpaceOptionsError(out, $.NSURL.fileURLWithPath(argv[1]), $.kCIFormatRGBA8, cs, $({}), err);
  return 'ok instances='+r.allInstances.count;
}
