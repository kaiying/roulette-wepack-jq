const defineEnv = (env) =>
  Object.keys(env).reduce((o, key) => {
    const value = env[key];
    o[`process.env.${key}`] = ['boolean', 'number'].indexOf(typeof value) !== -1 ? value : JSON.stringify(value);
    return o;
  }, {});

module.exports = {
  defineEnv,
};
