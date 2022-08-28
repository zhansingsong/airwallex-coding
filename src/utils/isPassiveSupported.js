const isPassiveSupported = function () {
  let supported = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return supported;
      },
    });
    document.addEventListener('test', null, opts);
    document.removeEventListener('test', null, opts);
  } catch (e) {}
  return supported;
};

// 处理事件绑定选项
export const eventListenerOptions = (useCapture = false, psassive = true) => {
  let options = useCapture;

  if (isPassiveSupported()) {
    options = {
      capture: useCapture,
      passive: psassive,
    };
  }
  return options;
};

export default isPassiveSupported;
