// // // App.tsx
// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import { ThemeProvider, createTheme } from '@mui/material/styles';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import { AuthProvider } from './contexts/AuthContext';
// // import Header from './components/Header';
// // import HomePage from './pages/HomePage';
// // import LoginPage from './pages/LoginPage';
// // import RegisterPage from './pages/RegisterPage';
// // import ProfilePage from './pages/ProfilePage';
// // import CountryListPage from './pages/CountryListPage';
// // import CountryDetailPage from './pages/CountryDetailPage';

// // const theme = createTheme();

// // const App: React.FC = () => {
// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <AuthProvider>
// //         <Router>
// //           <Header />
// //           <Routes>
// //             <Route path="/" element={<HomePage />} />
// //             <Route path="/login" element={<LoginPage />} />
// //             <Route path="/register" element={<RegisterPage />} />
// //             <Route path="/profile" element={<ProfilePage />} />
// //             <Route path="/countries" element={<CountryListPage />} />
// //             <Route path="/countries/:id" element={<CountryDetailPage />} />
// //           </Routes>
// //         </Router>
// //       </AuthProvider>
// //     </ThemeProvider>
// //   );
// // };

// // export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Header from './components/Header';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ProfilePage from './pages/ProfilePage';
// import CountryListPage from './pages/CountryListPage';
// import CountryDetailPage from './pages/CountryDetailPage';

// const theme = createTheme();

// const AppContent: React.FC = () => {
//   const { authenticated, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     return <Navigate to="/" />;
//   };

//   return (
//     <>
//       <Header onLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/profile" element={authenticated ? <ProfilePage /> : <Navigate to="/login" />} />
//         <Route path="/countries" element={<CountryListPage />} />
//         <Route path="/countries/:id" element={<CountryDetailPage />} />
//         <Route path="/logout" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AuthProvider>
//           <AppContent />
//         </AuthProvider>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;


// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CountryListPage from './pages/CountryListPage';
import CountryDetailPage from './pages/CountryDetailPage';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A9D8F',
    },
    secondary: {
      main: '#E9C46A',
    },
    background: {
      default: '#F4F1DE',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const AppContent: React.FC = () => {
  const { authenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    return <Navigate to="/" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={authenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/countries" element={<CountryListPage />} />
          <Route path="/countries/:id" element={<CountryDetailPage />} />
          <Route path="/logout" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
