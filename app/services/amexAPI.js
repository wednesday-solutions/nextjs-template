import { generateApiClient } from '@utils/apiUtils';

const api = generateApiClient('perks');

const oneLoginApi = generateApiClient('oneLogin');

export const createUser = (data) => api.post(`users`, data);

export const createEvent = (data) => api.post(`events`, data);

export const exchangeToken = (data) => api.post(`tokens`, data);

export const callReadUserSession = () => oneLoginApi.post(`ReadUserSession.v1`, {}, { withCredentials: true });
