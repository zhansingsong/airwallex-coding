import React from 'react';

const useScript = (scriptUrl: string, scriptId: string, callback?: () => void, filter?: () => boolean) => {
  React.useEffect(() => {
    if (filter && filter()) {
      return;
    }
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      const container = document.body;
      script.src = scriptUrl;
      script.id = scriptId;
      container.appendChild(script);

      script.onload = () => {
        if (callback) {
          callback();
        }
      };
      return;
    }

    if (existingScript && callback) {
      callback();
    }

    return () => {
      if (existingScript && callback && existingScript.remove) {
        existingScript.remove();
      }
    };
  }, []); // eslint-disable-line
};

export default useScript;
