const getURLQueryString = (queryString) => {
  const qs = queryString.length > 0 ? queryString.substring(1) : '';
  const args = {};
  const items = qs.length ? qs.split('&') : [];
  const len = items.length;
  let item = null;
  let name = null;
  let value = null;
  for (let i = 0; i < len; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
};

export default getURLQueryString;
