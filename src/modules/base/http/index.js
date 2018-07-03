import Qs from 'qs';
import jsonp from 'jsonp';
import axios from 'axios';

const Me = class BaseHttp {
  constructor(urlSet, env) {
    this._init();
    this.env = env;
    this.urlSet = urlSet;
  }
  /**
   * Wrap axios plugin for the event been called.
   * @function
   * @param {string}  url              - The relative url for request.
   * @param {string}  urlType          - the key of the urlset content.
   * @param {object}  requestConfig    - The config of request,follow the axios plugin rule.
   * @param {sting}   method           - The method name of the Http module trigger the event.
   *                                     ex:'Http.get()'-> 'get'
   */
  _request(method, url, urlType, ...other) {
    const prefix = (urlType && urlType in this.urlSet) ? this.urlSet[urlType] : '';
    const reqUrl = prefix + url;
    if (method === 'post' || method === 'put' || method === 'atch') {
      return this._requestData(method, reqUrl, ...other);
    }
    return axios[method](reqUrl, ...other);
  }

  _requestData(method, reqUrl, data, config) {
    if (config && config.isForm) {
      data = Qs.stringify(data);
    }
    return axios[method](reqUrl, data, config);
  }
  /**
   * Wrap jsonp for the event been called.
   * @function
   * @param {string}    url            - The relative url for request.
   * @param {string}    urlType        - the key of the urlset content.
   * @param {object}    requestConfig  - The config of request,follow the jsonp plugin rule.
   */
  _requestP(url, urlType, requestConfig) {
    const prefix = (urlType && urlType in this.urlSet) ? this.urlSet[urlType] : '';
    const reqUrl = prefix + url;
    return new Promise((resolve, reject) => {
      jsonp(reqUrl, requestConfig, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ data });
      });
    });
  }
  /**
   * Update the urlSet when in production mode
   * @function
   * @param {object}  urlSet
   */
  updateUrlSet(urlSet) {
    if (this.env !== 'production') {
      return;
    }
    Object.keys(urlSet).forEach((key) => {
      if (urlSet[key]) {
        this.urlSet[key] = urlSet[key];
      }
    });
  }

  _init() {
    ['jsonp', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach((method) => {
      Me.prototype[method] = (method === 'jsonp') ? this._requestP : this._request.bind(this, method);
    });
  }
};

export default Me;
