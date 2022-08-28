const isEmptyObj = (obj) => {
  return JSON.stringify(obj) === JSON.stringify({});
};

export default isEmptyObj;
