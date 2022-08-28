const strategies = {
  isNonEmpty(value = '', errorMsg) {
    return value === '' ? errorMsg : void 0;
  },
  minLength(value = '', length, errorMsg) {
    return value.length < length ? errorMsg : void 0;
  },
  isEqual(value = '', other, errorMsg) {
    return value !== other ? errorMsg : void 0;
  },
  isEmail(value = '', errorMsg) {
    return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? errorMsg : void 0;
  },
};
class Validator {
  constructor() {
    this.cache = [];
  }
  add(dom, rules) {
    for (let rule of rules) {
      if (typeof rule.strategy === 'function') {
        this.push(rule.strategy);
      } else {
        let strategyAry = rule.strategy.split(':');
        let errorMsg = rule.errorMsg;
        this.cache.push(() => {
          let strategy = strategyAry.shift();
          strategyAry.unshift(dom.value);
          strategyAry.push(errorMsg);
          let error = strategies[strategy].apply(dom, strategyAry);
          if (error) {
            dom.focus();
            dom.parentNode.classList.add('highlight', 'animated', 'wobble');
          }
          return error;
        });
      }
    }
  }
  start() {
    for (let validatorFun of this.cache) {
      let errorMsg = validatorFun();
      if (errorMsg) {
        return errorMsg;
      }
    }
  }
}

export default Validator;
