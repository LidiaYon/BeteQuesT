// import React, { useState, useEffect } from 'react';
// import { Container, Typography, TextField, Grid } from '@mui/material';
// import api from '../services/api';
// import CountryCard from '../components/CountryCard';

// interface Country {
//   _id: string;
//   name: string;
//   capital: string;
// }

// const CountryListPage: React.FC = () => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     try {
//       const response = await api.get('/countries');
//       setCountries(response.data);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     }
//   };

//   const filteredCountries = countries.filter(country =>
//     country.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Countries
//       </Typography>
//       <TextField
//         fullWidth
//         margin="normal"
//         label="Search Countries"
//         variant="outlined"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Grid container spacing={3}>
//         {filteredCountries.map(country => (
//           <Grid item xs={12} sm={6} md={4} key={country._id}>
//             <CountryCard country={country} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default CountryListPage;



// pages/CountryListPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid } from '@mui/material';
import api from '../services/api';
import CountryCard from '../components/CountryCard';

interface Country {
  _id: string;
  name: string;
  capital: string;
}

const CountryListPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await api.get('/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Explore Countries
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Search Countries"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={4}>
        {filteredCountries.map(country => (
          <Grid item xs={12} sm={6} md={4} key={country._id}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountryListPage;
