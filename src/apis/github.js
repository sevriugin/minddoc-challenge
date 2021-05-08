import axios from 'axios';

/**
 * axios client for GitHub free public API
 */
export default axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        get: { 
            Accept: 'application/vnd.github.v3+json',
        }
      }
});