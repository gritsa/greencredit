// BASE URL
export const BASEURL = 'http://127.0.0.1:8000/';
const IMAGE_URL = 'https://greencredits3bucket.s3.us-west-2.amazonaws.com/';

/**
 * create api urls
 * @param url string
 * @returns string
 */

const createApiUrl = (url) => {
  return `${BASEURL}${url}`;
};

export const mediaUrl = (mediaFileNameOrUrl) => {
  return IMAGE_URL + mediaFileNameOrUrl;
}

// Api urls
export const API_URLS = {
  login: () => createApiUrl('/login/'),
  signup: () => createApiUrl('/users/signup/'),
  profile: () => createApiUrl('/getData/'),
};
