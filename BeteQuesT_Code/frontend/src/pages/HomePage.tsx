// // // import React from 'react';
// // // import { Typography, Container } from '@mui/material';

// // // const HomePage: React.FC = () => {
// // //   return (
// // //     <Container>
// // //       <Typography variant="h2" component="h1" gutterBottom>
// // //         Welcome to BeteQuesT
// // //       </Typography>
// // //       <Typography variant="body1" gutterBottom>
// // //         Explore countries, plan your travels, and share your experiences!
// // //       </Typography>
// // //     </Container>
// // //   );
// // // };

// // // export default HomePage;

// // // pages/HomePage.tsx
// // // import React from 'react';
// // // import { Typography, Container, Button, Box } from '@mui/material';
// // // import { Link } from 'react-router-dom';

// // // const HomePage: React.FC = () => {
// // //   return (
// // //     <Box
// // //       sx={{
// // //         bgcolor: 'background.paper',
// // //         pt: 8,
// // //         pb: 6,
// // //       }}
// // //     >
// // //       <Container maxWidth="sm">
// // //         <Typography
// // //           component="h1"
// // //           variant="h2"
// // //           align="center"
// // //           color="text.primary"
// // //           gutterBottom
// // //         >
// // //           Welcome to BeteQuesT
// // //         </Typography>
// // //         <Typography variant="h5" align="center" color="text.secondary" paragraph>
// // //           Explore countries, plan your travels, and share your experiences!
// // //         </Typography>
// // //         <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
// // //           <Button variant="contained" color="primary" component={Link} to="/countries" sx={{ mr: 2 }}>
// // //             Explore Countries
// // //           </Button>
// // //           <Button variant="outlined" color="primary" component={Link} to="/register">
// // //             Join Now
// // //           </Button>
// // //         </Box>
// // //       </Container>
// // //     </Box>
// // //   );
// // // };

// // // export default HomePage;


// // import React from 'react';
// // import { Typography, Container, Button, Box, Grid, Paper } from '@mui/material';
// // import { Link } from 'react-router-dom';

// // const HomePage: React.FC = () => {
// //   return (
// //     <Box>
// //       {/* Hero Section */}
// //       <Box
// //         sx={{
// //           bgcolor: 'primary.main',
// //           color: 'white',
// //           py: 8,
// //           mb: 6,
// //           position: 'relative',
// //           overflow: 'hidden',
// //         }}
// //       >
// //         <Container maxWidth="lg">
// //           <Grid container spacing={4} alignItems="center">
// //             <Grid item xs={12} md={6}>
// //               <Typography component="h1" variant="h2" gutterBottom>
// //                 Welcome to BeteQuesT
// //               </Typography>
// //               <Typography variant="h5" paragraph>
// //                 Explore countries, plan your travels, and share your experiences!
// //               </Typography>
// //               <Box sx={{ mt: 4, display: 'flex' }}>
// //                 <Button variant="contained" color="secondary" component={Link} to="/countries" sx={{ mr: 2 }}>
// //                   Explore Countries
// //                 </Button>
// //                 <Button variant="outlined" color="secondary" component={Link} to="/register">
// //                   Join Now
// //                 </Button>
// //               </Box>
// //             </Grid>
// //             <Grid item xs={12} md={6}>
// //               {/* Replace with your actual image */}
// //               <Box
// //                 component="img"
// //                 src="/images/eri.jpg"
// //                 alt="World map"
// //                 sx={{
// //                   width: '100%',
// //                   maxWidth: 600,
// //                   height: 'auto',
// //                   borderRadius: 2,
// //                   boxShadow: 3,
// //                 }}
// //               />
// //             </Grid>
// //           </Grid>
// //         </Container>
// //       </Box>

// //       {/* Featured Countries Section */}
// //       <Container maxWidth="lg" sx={{ mb: 6 }}>
// //         <Typography variant="h3" component="h2" align="center" gutterBottom>
// //           Featured Countries
// //           </Typography>
// //         <Grid container spacing={4}>
// //           {[
// //             { name: 'France', image: '/images/eri.jpg' },
// //             { name: 'Japan', image: '/images/ethio.jpg' },
// //             { name: 'Brazil', image: '/images/brazil.jpg' }
// //           ].map((country, index) => (
// //             <Grid item xs={12} sm={4} key={index}>
// //               <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
// //                 <Box
// //                   component="img"
// //                   src={country.image}
// //                   alt={country.name}
// //                   sx={{ width: '100%', height: 200, objectFit: 'cover', mb: 2, borderRadius: 1 }}
// //                 />
// //                 <Typography variant="h5" component="h3" gutterBottom>
// //                   {country.name}
// //                 </Typography>
// //                 <Typography variant="body1" paragraph>
// //                   Discover the rich culture and heritage of {country.name}.
// //                 </Typography>
// //                 <Button variant="outlined" color="primary" component={Link} to={`/countries/${index + 1}`} sx={{ mt: 'auto' }}>
// //                   Learn More
// //                 </Button>
// //               </Paper>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </Container>

// //       {/* About BeteQuesT Section */}
// //       <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
// //         <Container maxWidth="md">
// //           <Typography variant="h3" component="h2" align="center" gutterBottom>
// //             About BeteQuesT
// //           </Typography>
// //           <Typography variant="body1" paragraph align="center">
// //             BeteQuesT is your ultimate guide to exploring the world's diverse cultures. 
// //             Our platform provides comprehensive information on countries, their customs, 
// //             and travel tips to help you plan your next adventure.
// //           </Typography>
// //           <Typography variant="body1" paragraph align="center">
// //             Whether you're a seasoned traveler or planning your first international trip, 
// //             BeteQuesT offers valuable insights to enhance your cultural understanding and 
// //             travel experiences.
// //           </Typography>
// //         </Container>
// //       </Box>

// //       {/* Call to Action Section */}
// //       <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6 }}>
// //         <Container maxWidth="md">
// //           <Typography variant="h4" component="h2" align="center" gutterBottom>
// //             Ready to Start Your Journey?
// //           </Typography>
// //           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
// //             <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>
// //               Sign Up Now
// //             </Button>
// //             <Button variant="outlined" color="primary" component={Link} to="/countries">
// //               Explore All Countries
// //             </Button>
// //           </Box>
// //         </Container>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default HomePage;



// import React from 'react';
// import { Typography, Container, Button, Box, Grid, Paper } from '@mui/material';
// import { Link } from 'react-router-dom';

// const HomePage: React.FC = () => {
//   return (
//     <Box>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           bgcolor: 'primary.main',
//           color: 'white',
//           py: 8,
//           mb: 6,
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//       >
//         <Container maxWidth="lg">
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               {/* Logo Placeholder */}
//               <Box
//                 component="img"
//                 src="./public/eri.jpg"
//                 alt="BeteQuest Logo"
//                 sx={{
//                   width: 200,
//                   height: 80,
//                   mb: 4,
//                 }}
//               />
//               <Typography component="h1" variant="h2" gutterBottom>
//                 Welcome to BeteQuesT
//               </Typography>
//               <Typography variant="h5" paragraph>
//                 Explore countries, plan your travels, and share your experiences!
//               </Typography>
//               <Box sx={{ mt: 4, display: 'flex' }}>
//                 <Button variant="contained" color="secondary" component={Link} to="/countries" sx={{ mr: 2 }}>
//                   Explore Countries
//                 </Button>
//                 <Button variant="outlined" color="secondary" component={Link} to="/register">
//                   Join Now
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               {/* Hero Image Placeholder */}
//               <Box
//                 component="img"
//                 src="/api/placeholder/600/400?text=World+Map"
//                 alt="World map"
//                 sx={{
//                   width: '100%',
//                   maxWidth: 600,
//                   height: 'auto',
//                   borderRadius: 2,
//                   boxShadow: 3,
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Featured Countries Section */}
//       <Container maxWidth="lg" sx={{ mb: 6 }}>
//         <Typography variant="h3" component="h2" align="center" gutterBottom>
//           Featured Countries
//         </Typography>
//         <Grid container spacing={4}>
//           {[
//             { name: 'France', image: '/api/placeholder/400/300?text=France' },
//             { name: 'Japan', image: '/api/placeholder/400/300?text=Japan' },
//             { name: 'Brazil', image: '/api/placeholder/400/300?text=Brazil' }
//           ].map((country, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <Box
//                   component="img"
//                   src={country.image}
//                   alt={country.name}
//                   sx={{ width: '100%', height: 200, objectFit: 'cover', mb: 2, borderRadius: 1 }}
//                 />
//                 <Typography variant="h5" component="h3" gutterBottom>
//                   {country.name}
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   Discover the rich culture and heritage of {country.name}.
//                 </Typography>
//                 <Button variant="outlined" color="primary" component={Link} to={`/countries/${index + 1}`} sx={{ mt: 'auto' }}>
//                   Learn More
//                 </Button>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* About BeteQuesT Section */}
//       <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
//         <Container maxWidth="md">
//           <Typography variant="h3" component="h2" align="center" gutterBottom>
//             About BeteQuesT
//           </Typography>
//           <Typography variant="body1" paragraph align="center">
//             BeteQuesT is your ultimate guide to exploring the world's diverse cultures. 
//             Our platform provides comprehensive information on countries, their customs, 
//             and travel tips to help you plan your next adventure.
//           </Typography>
//           <Typography variant="body1" paragraph align="center">
//             Whether you're a seasoned traveler or planning your first international trip, 
//             BeteQuesT offers valuable insights to enhance your cultural understanding and 
//             travel experiences.
//           </Typography>
//         </Container>
//       </Box>

//       {/* Call to Action Section */}
//       <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6 }}>
//         <Container maxWidth="md">
//           <Typography variant="h4" component="h2" align="center" gutterBottom>
//             Ready to Start Your Journey?
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>
//               Sign Up Now
//             </Button>
//             <Button variant="outlined" color="primary" component={Link} to="/countries">
//               Explore All Countries
//             </Button>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;


// import React from 'react';
// import { Typography, Container, Button, Box, Grid, Paper } from '@mui/material';
// import { Link } from 'react-router-dom';

// // Import images
// import logoImage from './images/hero.jpeg';
// import worldMapImage from './images/eri.jpg';
// import EriImage from './images/eri.jpg';
// import japanImage from './images/ethio.jpg';
// import brazilImage from './images/brazil.jpg';

// const HomePage: React.FC = () => {
//   return (
//     <Box>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           bgcolor: 'primary.main',
//           color: 'white',
//           py: 8,
//           mb: 6,
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//       >
//         <Container maxWidth="lg">
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               {/* Logo */}
//               <Box
//                 component="img"
//                 src={logoImage}
//                 alt="BeteQuest Logo"
//                 sx={{
//                   width: 200,
//                   height: 'auto',
//                   mb: 4,
//                 }}
//               />
//               <Typography component="h1" variant="h2" gutterBottom>
//                 Welcome to BeteQuesT
//               </Typography>
//               <Typography variant="h5" paragraph>
//                 Explore countries, plan your travels, and share your experiences!
//               </Typography>
//               <Box sx={{ mt: 4, display: 'flex' }}>
//                 <Button variant="contained" color="secondary" component={Link} to="/countries" sx={{ mr: 2 }}>
//                   Explore Countries
//                 </Button>
//                 <Button variant="outlined" color="secondary" component={Link} to="/register">
//                   Join Now
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box
//                 component="img"
//                 src={worldMapImage}
//                 alt="World map"
//                 sx={{
//                   width: '100%',
//                   maxWidth: 600,
//                   height: 'auto',
//                   borderRadius: 2,
//                   boxShadow: 3,
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Featured Countries Section */}
//       <Container maxWidth="lg" sx={{ mb: 6 }}>
//         <Typography variant="h3" component="h2" align="center" gutterBottom>
//           Featured Countries
//         </Typography>
//         <Grid container spacing={4}>
//           {[
//             { name: 'Eritrea', image: EriImage },
//             { name: 'Ethiopia', image: japanImage },
//             { name: 'Brazil', image: brazilImage }
//           ].map((country, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <Box
//                   component="img"
//                   src={country.image}
//                   alt={country.name}
//                   sx={{ width: '100%', height: 200, objectFit: 'cover', mb: 2, borderRadius: 1 }}
//                 />
//                 <Typography variant="h5" component="h3" gutterBottom>
//                   {country.name}
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   Discover the rich culture and heritage of {country.name}.
//                 </Typography>
//                 <Button variant="outlined" color="primary" component={Link} to="/countries">                
//                   Learn More
//                 </Button>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* About BeteQuesT Section */}
//       <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
//         <Container maxWidth="md">
//           <Typography variant="h3" component="h2" align="center" gutterBottom>
//             About BeteQuesT
//           </Typography>
//           <Typography variant="body1" paragraph align="center">
//             BeteQuesT is your ultimate guide to exploring the world's diverse cultures. 
//             Our platform provides comprehensive information on countries, their customs, 
//             and travel tips to help you plan your next adventure.
//           </Typography>
//           <Typography variant="body1" paragraph align="center">
//             Whether you're a seasoned traveler or planning your first international trip, 
//             BeteQuesT offers valuable insights to enhance your cultural understanding and 
//             travel experiences.
//           </Typography>
//         </Container>
//       </Box>

//       {/* Call to Action Section */}
//       <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6 }}>
//         <Container maxWidth="md">
//           <Typography variant="h4" component="h2" align="center" gutterBottom>
//             Ready to Start Your Journey?
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>
//               Sign Up Now
//             </Button>
//             <Button variant="outlined" color="primary" component={Link} to="/countries">
//               Explore All Countries
//             </Button>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;


import React from 'react';
import { Typography, Container, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

// Import images
// import logoImage from './images/hero.jpeg';
import worldMapImage from './images/eri.jpg';
import EriImage from './images/eri.jpg';
import japanImage from './images/ethio.jpg';
import brazilImage from './images/brazil.jpg';

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
             
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <Typography component="h1" variant="h2" gutterBottom>
                  Welcome to BeteQuesT
                </Typography>
                <Typography variant="h5" paragraph>
                  Explore countries, plan your travels, and share your experiences!
                </Typography>
                <Box sx={{ mt: 4, display: 'flex' }}>
                  <Button variant="contained" color="secondary" component={Link} to="/countries" sx={{ mr: 2 }}>
                    Explore Countries
                  </Button>
                  <Button variant="outlined" color="secondary" component={Link} to="/register">
                    Join Now
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={worldMapImage}
                alt="World map"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                  objectFit: 'cover',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Countries Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Featured Countries
        </Typography>
        <Grid container spacing={4}>
          {[
            { name: 'Eritrea', image: EriImage },
            { name: 'Ethiopia', image: japanImage },
            { name: 'Brazil', image: brazilImage }
          ].map((country, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  component="img"
                  src={country.image}
                  alt={country.name}
                  sx={{ width: '100%', height: 200, objectFit: 'cover', mb: 2, borderRadius: 1 }}
                />
                <Typography variant="h5" component="h3" gutterBottom>
                  {country.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  Discover the rich culture and heritage of {country.name}.
                </Typography>
                <Button variant="outlined" color="primary" component={Link} to="/countries">
                  Learn More
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About BeteQuesT Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            About BeteQuesT
          </Typography>
          <Typography variant="body1" paragraph align="center">
            BeteQuesT is your ultimate guide to exploring the world's diverse cultures. 
            Our platform provides comprehensive information on countries, their customs, 
            and travel tips to help you plan your next adventure.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Whether you're a seasoned traveler or planning your first international trip, 
            BeteQuesT offers valuable insights to enhance your cultural understanding and 
            travel experiences.
          </Typography>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>
              Sign Up Now
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/countries">
              Explore All Countries
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
