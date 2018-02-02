class GetFuncArgs {
  /**
   * Get arguments.
   */
  static args(func/* , configs = {} */) {
    if (typeof func !== 'function') {
      throw new Error('Wrong argument type, it should be a function.');
    }
    return GetFuncArgs._get(func.toString());
  }

  /**
   * Get arguments.
   * @param funcStr
   * @return {*}
   * @private
   */
  static _get(funcStr) {
    const start = funcStr.indexOf('(');
    if (start === -1) {
      return null;
    }
    const args = [];
    let [a, b, c, argp] = [0, 0, 1, start + 1]; // 3 diff types of brackets
    for (let i = start + 1; i < funcStr.length; i += 1) {
      if (funcStr.charAt(i) === '[') a += 1;
      else if (funcStr.charAt(i) === ']') a -= 1;
      else if (funcStr.charAt(i) === '{') b += 1;
      else if (funcStr.charAt(i) === '}') b -= 1;
      else if (funcStr.charAt(i) === '(') c += 1;
      else if (funcStr.charAt(i) === ')') c -= 1;
      if (a === 0 && b === 0) { // there are no [ { brackets left open
        if (c === 0) { // all brackets are closed
          if (argp < i) {
            args.push(funcStr.substring(argp, i));
          }
          break;
        } else if (funcStr.charAt(i) === ',') { // there is only main ( bracket open
          args.push(funcStr.substring(argp, i));
          argp = i + 1;
        }
      }
    }
    return args.map((arg) => {
      if (arg.charAt(0) === ' ') {
        arg = arg.substring(1, arg.length);
      }
      if (arg.charAt(arg.length - 1) === ' ') {
        arg.substring(0, arg.length - 1);
      }
      return arg;
    });
  }

  // static _format() {
  //
  // }
}

module.exports = GetFuncArgs.args;
