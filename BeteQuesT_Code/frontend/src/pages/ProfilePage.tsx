// import React, { useState, useEffect } from 'react';
// import { Typography, Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
// import api from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

// interface Profile {
//   fullName: string;
//   bio: string;
//   interests: string[];
//   visitedCountries: string[];
//   wishlist: string[];
// }

// const ProfilePage: React.FC = () => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [editing, setEditing] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/users/profile');
//       setProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.put('/users/profile', profile);
//       setEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   if (!profile) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         User Profile
//       </Typography>
//       {editing ? (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Full Name"
//             value={profile.fullName}
//             onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Bio"
//             multiline
//             rows={4}
//             value={profile.bio}
//             onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </form>
//       ) : (
//         <>
//           <Typography variant="h6">Full Name: {profile.fullName}</Typography>
//           <Typography variant="body1">Bio: {profile.bio}</Typography>
//           <Button onClick={() => setEditing(true)} variant="contained" color="primary">
//             Edit Profile
//           </Button>
//         </>
//       )}
//       <Typography variant="h6">Visited Countries</Typography>
//       <List>
//         {profile.visitedCountries.map((country, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={country} />
//           </ListItem>
//         ))}
//       </List>
//       <Typography variant="h6">Wishlist</Typography>
//       <List>
//         {profile.wishlist.map((country, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={country} />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ProfilePage;


// import React, { useState, useEffect } from 'react';
// import { Typography, Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

// interface CountryReference {
//   id: string;
//   name: string;
// }

// interface Profile {
//   fullName: string;
//   bio: string;
//   interests: string[];
//   visitedCountries: CountryReference[];
//   wishlist: CountryReference[];
// }

// const ProfilePage: React.FC = () => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [editing, setEditing] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/users/profile');
//       setProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.put('/users/profile', profile);
//       setEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   if (!profile) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         User Profile
//       </Typography>
//       {editing ? (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Full Name"
//             value={profile.fullName}
//             onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Bio"
//             multiline
//             rows={4}
//             value={profile.bio}
//             onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </form>
//       ) : (
//         <>
//           <Typography variant="h6">Full Name: {profile.fullName}</Typography>
//           <Typography variant="body1">Bio: {profile.bio}</Typography>
//           <Button onClick={() => setEditing(true)} variant="contained" color="primary">
//             Edit Profile
//           </Button>
//         </>
//       )}
//       <Typography variant="h6">Visited Countries</Typography>
//       <List>
//         {profile.visitedCountries.map((country) => (
//           <ListItem key={country.id}>
//             <ListItemText>
//               <Link to={`/countries/${country.id}`}>{country.name}</Link>
//             </ListItemText>
//           </ListItem>
//         ))}
//       </List>
//       <Typography variant="h6">Wishlist</Typography>
//       <List>
//         {profile.wishlist.map((country) => (
//           <ListItem key={country.id}>
//             <ListItemText>
//               <Link to={`/countries/${country.id}`}>{country.name}</Link>
//             </ListItemText>
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ProfilePage;



// import React, { useState, useEffect } from 'react';
// import { Typography, Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

// interface Country {
//   _id: string;
//   name: string;
// }

// interface Profile {
//   fullName: string;
//   bio: string;
//   interests: string[];
//   visitedCountries: Country[];
//   wishlist: Country[];
// }

// const ProfilePage: React.FC = () => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [editing, setEditing] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/users/profile');
//       setProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.put('/users/profile', profile);
//       setEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   if (!profile) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         User Profile
//       </Typography>
//       {editing ? (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Full Name"
//             value={profile.fullName}
//             onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Bio"
//             multiline
//             rows={4}
//             value={profile.bio}
//             onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </form>
//       ) : (
//         <>
//           <Typography variant="h6">Full Name: {profile.fullName}</Typography>
//           <Typography variant="body1">Bio: {profile.bio}</Typography>
//           <Button onClick={() => setEditing(true)} variant="contained" color="primary">
//             Edit Profile
//           </Button>
//         </>
//       )}
//       <Typography variant="h6">Visited Countries</Typography>
//       <List>
//         {profile.visitedCountries.map((country) => (
//           <ListItem key={country._id}>
//             <ListItemText>
//               <Link to={`/countries/${country._id}`}>{country.name}</Link>
//             </ListItemText>
//           </ListItem>
//         ))}
//       </List>
//       <Typography variant="h6">Wishlist</Typography>
//       <List>
//         {profile.wishlist.map((country) => (
//           <ListItem key={country._id}>
//             <ListItemText>
//               <Link to={`/countries/${country._id}`}>{country.name}</Link>
//             </ListItemText>
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ProfilePage;


// import React, { useState, useEffect } from 'react';
// import { Typography, Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

// interface Country {
//   _id: string;
//   name: string;
// }

// interface Profile {
//   fullName: string;
//   bio: string;
//   interests: string[];
//   visitedCountries: Country[];
//   wishlist: Country[];
// }

// const ProfilePage: React.FC = () => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [editing, setEditing] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await api.get('/users/profile');
//       console.log('Received profile data:', response.data);
//       setProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.put('/users/profile', profile);
//       setEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   if (!profile) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         User Profile
//       </Typography>
//       {editing ? (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Full Name"
//             value={profile.fullName}
//             onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Bio"
//             multiline
//             rows={4}
//             value={profile.bio}
//             onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </form>
//       ) : (
//         <>
//           <Typography variant="h6">Full Name: {profile.fullName}</Typography>
//           <Typography variant="body1">Bio: {profile.bio}</Typography>
//           <Button onClick={() => setEditing(true)} variant="contained" color="primary">
//             Edit Profile
//           </Button>
//         </>
//       )}
//       <Typography variant="h6">Visited Countries</Typography>
//       <List>
//         {profile.visitedCountries && profile.visitedCountries.length > 0 ? (
//           profile.visitedCountries.map((country) => (
//             <ListItem key={country._id}>
//               <ListItemText>
//                 <Link to={`/countries/${country._id}`}>{country.name}</Link>
//               </ListItemText>
//             </ListItem>
//           ))
//         ) : (
//           <ListItem>
//             <ListItemText primary="No visited countries yet" />
//           </ListItem>
//         )}
//       </List>
//       <Typography variant="h6">Wishlist</Typography>
//       <List>
//         {profile.wishlist && profile.wishlist.length > 0 ? (
//           profile.wishlist.map((country) => (
//             <ListItem key={country._id}>
//               <ListItemText>
//                 <Link to={`/countries/${country._id}`}>{country.name}</Link>
//               </ListItemText>
//             </ListItem>
//           ))
//         ) : (
//           <ListItem>
//             <ListItemText primary="No countries in wishlist yet" />
//           </ListItem>
//         )}
//       </List>
//     </Container>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, List, ListItem, ListItemText, CircularProgress, Paper, Grid } from '@mui/material';


import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Country {
  _id: string;
  name: string;
}

interface Profile {
  fullName: string;
  bio: string;
  interests: string[];
  visitedCountries: Country[];
  wishlist: Country[];
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/profile');
      console.log('Profile data received:', response.data);
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', profile);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  console.log('Current profile state:', profile);
  console.log('Loading state:', loading);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!profile) {
    return <Typography>No profile found. Please create one.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : profile ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {editing ? (
                <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            value={profile.fullName}
            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            multiline
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
     ) : (
      <>
        <Typography variant="h6">Full Name: {profile.fullName}</Typography>
        <Typography variant="body1">Bio: {profile.bio}</Typography>
        <Button onClick={() => setEditing(true)} variant="contained" color="primary" sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </>
    )}
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography variant="h6">Visited Countries</Typography>
    <List>
        {profile.visitedCountries && profile.visitedCountries.length > 0 ? (
          profile.visitedCountries.map((country) => (
            <ListItem key={country._id}>
              <ListItemText>
                <Link to={`/countries/${country._id}`}>{country.name}</Link>
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No visited countries yet" />
          </ListItem>
        )}
      </List>
      <Typography variant="h6" sx={{ mt: 3 }}>Wishlist</Typography>
      <List>
        {profile.wishlist && profile.wishlist.length > 0 ? (
          profile.wishlist.map((country) => (
            <ListItem key={country._id}>
              <ListItemText>
                <Link to={`/countries/${country._id}`}>{country.name}</Link>
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No countries in wishlist yet" />
          </ListItem>
        )}
      </List>
      </Grid>
          </Grid>
          ) : (
            <Typography>No profile found. Please create one.</Typography>
          )}
        </Paper>
    </Container>
  );
};

export default ProfilePage;