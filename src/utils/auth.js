// Decode JWT payload without a library
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  // exp is in seconds, Date.now() in ms
  return payload.exp * 1000 > Date.now();
};

export const getToken = () =>
  localStorage.getItem('token') || sessionStorage.getItem('token');

export const saveToken = (token, remember) => {
  if (remember) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const clearToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};
