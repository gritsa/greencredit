// BASE URL
export const BASEURL = 'http://localhost:4545';

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
  signup: () => createApiUrl('/signup/'),
  profile: () => createApiUrl('/getData/'),
};
