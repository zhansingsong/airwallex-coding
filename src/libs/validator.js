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
    this.cache = []; //保存校验规则
  }
  add(dom, rules) {
    for (let rule of rules) {
      if (typeof rule.strategy === 'function') {
        this.push(rule.strategy);
      } else {
        let strategyAry = rule.strategy.split(':'); //例如['minLength',6]
        let errorMsg = rule.errorMsg; //'用户名不能为空'
        this.cache.push(() => {
          let strategy = strategyAry.shift(); //用户挑选的strategy
          strategyAry.unshift(dom.value); //把input的value添加进参数列表
          strategyAry.push(errorMsg); //把errorMsg添加进参数列表，[dom.value,6,errorMsg]
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
      let errorMsg = validatorFun(); //开始校验，并取得校验后的返回信息
      if (errorMsg) {
        //如果有确切返回值，说明校验没有通过
        return errorMsg;
      }
    }
  }
}

export default Validator;
