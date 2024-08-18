// // import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// // import api from '../services/api';


// // interface AuthContextData {
// //   authenticated: boolean;
// //   user: any;
// //   loading: boolean;
// //   login: (email: string, password: string) => Promise<void>;
// //   logout: () => void;
// //   register: (username: string, email: string, password: string) => Promise<void>;
// // }

// // const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// // interface AuthProviderProps {
// //   children: ReactNode;
// // }

// // export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// //   const [user, setUser] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('user');
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //     setLoading(false);
// //   }, []);

// //   const login = async (email: string, password: string) => {
// //     const response = await api.post('/users/login', { email, password });
// //     setUser(response.data);
// //     api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
// //     localStorage.setItem('user', JSON.stringify(response.data));
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem('user');
// //     api.defaults.headers.Authorization = '';
// //   };

// //   const register = async (username: string, email: string, password: string) => {
// //     const response = await api.post('/users/register', { username, email, password });
// //     setUser(response.data);
// //     api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
// //     localStorage.setItem('user', JSON.stringify(response.data));
// //   };

// //   return (
// //     <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, register }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }


// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// import api from '../services/api';

// interface AuthContextData {
//   authenticated: boolean;
//   user: any;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   register: (username: string, email: string, password: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await api.post('/users/login', { email, password });
//     setUser(response.data);
//     api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
//     localStorage.setItem('user', JSON.stringify(response.data));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     api.defaults.headers.Authorization = '';
//   };

//   const register = async (username: string, email: string, password: string) => {
//     const response = await api.post('/users/register', { username, email, password });
//     setUser(response.data);
//     api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
//     localStorage.setItem('user', JSON.stringify(response.data));
//   };

//   return (
//     <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// import api from '../services/api';

// interface AuthContextData {
//   authenticated: boolean;
//   user: any;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   register: (username: string, email: string, password: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await api.post('/users/login', { email, password });
//     setUser(response.data);
//     api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
//     localStorage.setItem('user', JSON.stringify(response.data));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     api.defaults.headers.Authorization = '';
//   };

//   const register = async (username: string, email: string, password: string) => {
//     await api.post('/users/register', { username, email, password });
//     // We don't set the user or token here, as we want them to log in separately
//   };

//   return (
//     <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface AuthContextData {
  authenticated: boolean;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      api.defaults.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    const loggedUser = response.data;
    setUser(loggedUser);
    api.defaults.headers.Authorization = `Bearer ${loggedUser.token}`;
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    api.defaults.headers.Authorization = '';
    localStorage.removeItem('user');
  };

  const register = async (username: string, email: string, password: string) => {
    await api.post('/users/register', { username, email, password });
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);