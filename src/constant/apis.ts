// const BASENAME = process.env.REACT_APP_BASENAME;
const APIs = {
  /**
   * 验证接口：`https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`
   *
   * @method POST
   * @type 请求类型：`"application/json"`
   * @param
   *  - name: string
   *  - email: string
   *
   * @case Email "usedemail@airwallex.com" is hardcoded in the backend to trigger a specific error that needs to be handled by the front-end app.
   */
  validate: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
} as const;

export default APIs;
