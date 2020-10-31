const fs = require('fs');

const getCommonName = () => '.env';
const getEnvName = (env) => (env === 'production' ? '.env.prd' : env === 'stg' ? '.env.stg' : env === 'lab' ? '.env.lab' : '.env.development');
const getLocalEnvName = (env) => `${getEnvName(env)}.local`;

const processEnvFile = (env, action) => {
  const files = [getLocalEnvName(env), getEnvName(env), getCommonName()];
  files.forEach((file) => {
    if (!fs.existsSync(file)) return;
    action(file);
  });
};

module.exports = processEnvFile;
