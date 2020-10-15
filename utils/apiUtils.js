import { create } from 'apisauce';
import { camelCase, snakeCase } from 'lodash';
import CryptoJS from 'crypto-js';
import { mapKeysDeep } from './index';

const { NEXT_PUBLIC_BASE_API_URL } = process.env;

export const createApiClientWithTransForm = (baseURL) => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform((response) => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, (keys) => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform((request) => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, (keys) => snakeCase(keys));
    }

    if (baseURL === NEXT_PUBLIC_BASE_API_URL) {
      setHeaders(request);
    }

    return request;
  });
  return api;
};

const apiClients = {
  oneLogin: null,
  perks: null,
  default: null
};

export const getApiClient = (type = 'perks') => apiClients[type];

export const generateApiClient = (type = 'perks') => {
  switch (type) {
    case 'perks':
      apiClients[type] = createApiClientWithTransForm(NEXT_PUBLIC_BASE_API_URL);
      return apiClients[type];
    case 'oneLogin':
      apiClients[type] = createApiClientWithTransForm(process.env.NEXT_PUBLIC_ONE_LOGIN_DEV);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(NEXT_PUBLIC_BASE_API_URL);
      return apiClients.default;
  }
};

export const setHeaders = (request) => {
  const method = request.method;
  const urlPathname = request.url;
  const body = request.data;
  const salt = CryptoJS.lib.WordArray.random(12).toString();
  const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();

  const apiKey = process.env.MARKETPLACE_API_KEY;
  const campaignUuid = process.env.NEXT_PUBLIC_MARKETPLACE_CAMPAIGN_UUID;
  const toSign = method + `/${urlPathname}` + salt + timestamp + apiKey + (body ? JSON.stringify(body) : '');
  let signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(toSign, apiKey));
  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));
  request.headers = {
    ...request.headers,
    salt: salt,
    timestamp: timestamp,
    'x-ap-marketplace-uuid': campaignUuid,
    signature: signature
  };
};
