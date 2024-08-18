// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Header: React.FC = () => {
//   const { authenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>BeteQuesT</Link>
//         </Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/countries">Countries</Button>
//         {authenticated ? (
//           <>
//             <Button color="inherit" component={Link} to="/profile">Profile</Button>
//             <Button color="inherit" onClick={handleLogout}>Logout</Button>
//           </>
//         ) : (
//           <>
//             <Button color="inherit" component={Link} to="/login">Login</Button>
//             <Button color="inherit" component={Link} to="/register">Register</Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;


// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// interface HeaderProps {
//   onLogout: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onLogout }) => {
//   const { authenticated } = useAuth();

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>BeteQuesT</Link>
//         </Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/countries">Countries</Button>
//         {authenticated ? (
//           <>
//             <Button color="inherit" component={Link} to="/profile">Profile</Button>
//             <Button color="inherit" onClick={onLogout}>Logout</Button>
//           </>
//         ) : (
//           <>
//             <Button color="inherit" component={Link} to="/login">Login</Button>
//             <Button color="inherit" component={Link} to="/register">Register</Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

// components/Header.tsx
// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// interface HeaderProps {
//   onLogout: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onLogout }) => {
//   const { authenticated } = useAuth();

//   return (
//     <AppBar position="static" color="primary" elevation={0}>
//       <Container maxWidth="lg">
//         <Toolbar disableGutters>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//             <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>BeteQuesT</Link>
//           </Typography>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//           <Button color="inherit" component={Link} to="/countries">Explore</Button>
//           {authenticated ? (
//             <>
//               <Button color="inherit" component={Link} to="/profile">Profile</Button>
//               <Button color="inherit" onClick={onLogout}>Logout</Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/login">Login</Button>
//               <Button color="inherit" component={Link} to="/register">Register</Button>
//             </>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;

// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// // Logo import
// import logoImage from './images/hero.jpeg';

// interface HeaderProps {
//   onLogout: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onLogout }) => {
//   const { authenticated } = useAuth();

//   return (
//     <AppBar position="static" color="primary" elevation={0} sx={{ mb: 4 }}> {/* Added margin-bottom */}
//       <Container maxWidth="lg">
//         <Toolbar disableGutters>
//           <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//             <Box
//               component="img"
//               src={logoImage}
//               alt="BeteQuest Logo"
//               sx={{
//                 width: 50,
//                 height: 'auto',
//                 mr: 2,
//                 position: 'absolute',
//                 top: 8,
//                 right: 8,
//               }}
//             />
//             <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//               <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>BeteQuesT</Link>
//             </Typography>
//           </Box>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//           <Button color="inherit" component={Link} to="/countries">Explore</Button>
//           {authenticated ? (
//             <>
//               <Button color="inherit" component={Link} to="/profile">Profile</Button>
//               <Button color="inherit" onClick={onLogout}>Logout</Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/login">Login</Button>
//               <Button color="inherit" component={Link} to="/register">Register</Button>
//             </>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;

// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// // Logo import
// import logoImage from './images/hero.jpeg'; // Adjust path as necessary

// interface HeaderProps {
//   onLogout: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onLogout }) => {
//   const { authenticated } = useAuth();

//   return (
//     <AppBar position="static" color="primary" elevation={0}>
//       <Container maxWidth="lg">
//         <Toolbar disableGutters>
//           <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
//             <Box
//               component="img"
//               src={logoImage}
//               alt="BeteQuesT Logo"
//               sx={{
//                 width: 50, // Adjust size as needed
//                 height: 'auto',
//                 mr: 1,
//               }}
//             />
//             <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//               <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>BeteQuesT</Link>
//             </Typography>
//           </Box>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//           <Button color="inherit" component={Link} to="/countries">Explore</Button>
//           {authenticated ? (
//             <>
//               <Button color="inherit" component={Link} to="/profile">Profile</Button>
//               <Button color="inherit" onClick={onLogout}>Logout</Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/login">Login</Button>
//               <Button color="inherit" component={Link} to="/register">Register</Button>
//             </>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;


// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// // Logo import
// import logoImage from './images/hero.jpeg'; // Adjust path as necessary

// interface HeaderProps {
//   onLogout: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onLogout }) => {
//   const { authenticated } = useAuth();

//   return (
//     <AppBar position="static" color="primary" elevation={0}>
//       <Container maxWidth="lg">
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           {/* BeteQuesT Logo and Text */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Box
//               component="img"
//               src={logoImage}
//               alt="BeteQuesT Logo"
//               sx={{
//                 width: 50, // Adjust size as needed
//                 height: 'auto',
//                 mr: 1,
//               }}
//             />
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//               <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>BeteQuesT</Link>
//             </Typography>
//           </Box>
          
//           {/* Navigation Links */}
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Button color="inherit" component={Link} to="/">Home</Button>
//             <Button color="inherit" component={Link} to="/countries">Explore</Button>
//             {authenticated ? (
//               <>
//                 <Button color="inherit" component={Link} to="/profile">Profile</Button>
//                 <Button color="inherit" onClick={onLogout}>Logout</Button>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" component={Link} to="/login">Login</Button>
//                 <Button color="inherit" component={Link} to="/register">Register</Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;


import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Logo import
import logoImage from './images/hero.jpeg'; // Adjust path as necessary

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { authenticated } = useAuth();

  return (
    <AppBar 
      position="static" 
      color="transparent" // Transparent color to apply custom styling
      elevation={0} 
      sx={{ 
        bgcolor: 'rgba(245, 245, 220, 0.8)', // Beige color with 80% opacity
        p: 2, // Padding as needed
        backdropFilter: 'blur(10px)' // Optional: Adds a blur effect
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* BeteQuesT Logo and Text */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logoImage}
              alt="BeteQuesT Logo"
              sx={{
                width: 50, // Adjust size as needed
                height: 'auto',
                mr: 1,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>BeteQuesT</Link>
            </Typography>
          </Box>
          
          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/countries" sx={{ ml: 2 }}>
              Explore
            </Button>
            {authenticated ? (
              <>
                <Button color="inherit" component={Link} to="/profile" sx={{ ml: 2 }}>
                  Profile
                </Button>
                <Button color="inherit" onClick={onLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register" sx={{ ml: 2 }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
