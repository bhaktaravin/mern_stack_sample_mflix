const BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = (path, options = {}) =>
  fetch(`${BASE_URL}${path}`, options);
