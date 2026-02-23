import { generateApiClient } from '@utils/apiUtils';

const authApi = generateApiClient('auth');

export const loginUser = (credentials) => authApi.post('/login', credentials);

export const signupUser = (userData) => authApi.post('/signup', userData);
