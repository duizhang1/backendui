export const authHeaderInterceptor = (url, options) => {
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: token };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
