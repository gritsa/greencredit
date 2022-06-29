// BASE URL
export const BASEURL = 'http://127.0.0.1:8000/';

/**
 * create api urls
 * @param url string
 * @returns string
 */

const createApiUrl = (url) => {
  return `${BASEURL}${url}`;
};

// Api urls
export const API_URLS = {
  login: () => createApiUrl('/login/'),
  signup: () => createApiUrl('/users/signup/'),
  profile: () => createApiUrl('/getData/'),
};
