export const setAuthToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };