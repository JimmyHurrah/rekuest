import flow from 'lodash.flow';
import isFunction from 'lodash.isfunction';

import { send } from './http';

const defaults = {
  method: 'get',
  headers: {},
  url: '',
  uri: '',
  params: {},
  query: {},
  body: {},
};

const rekuest = (req, ...alts) => {
  if (isFunction(req)) {
    alts.unshift(req);
    req = { ...defaults };
  }

  if (!req) {
    return rekuest(defaults);
  }

  if (alts.length) {
    const alteration = flow(alts);
    return rekuest(alteration(req));
  }

  return (...alts) => {
    if (alts.length) {
      const alteration = flow(alts);
      return rekuest(alteration(req));
    }

    return send(req);
  };
};

export default rekuest;
export { rekuest };

export const method = m => req => ({ ...req, method: m });

export const headers = h => req => ({ ...req, headers: { ...req.headers, ...h } });

export const url = u => req => ({ ...req, url: u });

export const uri = u => req => ({ ...req, uri: `${req.uri}${u}`});

export const params = p => req => ({ ...req, params: { ...params, ...p } });

export const query = q => req => ({ ...req, query: { ...query, ...q } });

export const body = b => req => ({ ...req, body: { ...body, ...b } });