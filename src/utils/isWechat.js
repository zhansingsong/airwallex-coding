const isWechat = () => {
  //判断是否是微信
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
};

export default isWechat;
