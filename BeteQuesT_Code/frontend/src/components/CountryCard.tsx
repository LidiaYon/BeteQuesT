// import React from 'react';
// import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// interface CountryCardProps {
//   country: {
//     _id: string;
//     name: string;
//     capital: string;
//   };
// }

// const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h5" component="h2">
//           {country.name}
//         </Typography>
//         <Typography color="text.secondary">
//           Capital: {country.capital}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" component={Link} to={`/countries/${country._id}`}>Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default CountryCard;

// components/CountryCard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface CountryCardProps {
  country: {
    _id: string;
    name: string;
    capital: string;
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {country.name}
        </Typography>
        <Typography color="text.secondary">
          Capital: {country.capital}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/countries/${country._id}`} color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default CountryCard;
