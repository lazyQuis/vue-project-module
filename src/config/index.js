import defaultData from './default';
import development from './development';
import production from './production';

const data = {
  default: defaultData,
  development,
  production,
};

const cfg = data.default || {};
const cfgExt = data[process.env.NODE_ENV] || {};
cfg.env = process.env.NODE_ENV;
cfg.hide = cfg.hide || process.env.HIDE_SET === true;

export default Object.assign({}, cfg, cfgExt);
