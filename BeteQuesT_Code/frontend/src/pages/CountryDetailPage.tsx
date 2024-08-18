import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Grid, Paper, Box } from '@mui/material';

import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Country {
  _id: string;
  name: string;
  capital: string;
  population: number;
  languages: string[];
  currency: string;
  landmarks: {
    name: string;
    description: string;
    location: string;
  }[];
  culturalInfo: {
    greetings: string;
    customs: string;
    etiquette: string;
    religion: {
      mainReligions: string[];
      practices: string;
    };
    family: {
      dynamics: string;
      genderRoles: string;
      marriageCustoms: string;
    };
    naming: {
      conventions: string;
      addressingOthers: string;
    };
    datesOfSignificance: {
      national: string[];
      religious: string[];
    };
    communication: {
      verbalPatterns: string;
      nonVerbalCustoms: string;
    };
  };
  businessCulture: {
    norms: string;
    etiquette: string;
  };
  imageUrl: string;
}

const CountryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [comment, setComment] = useState('');
  const { authenticated } = useAuth();

  useEffect(() => {
    fetchCountry();
  }, [id]);

  const fetchCountry = async () => {
    try {
      const response = await api.get(`/countries/${id}`);
      setCountry(response.data);
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await api.post('/users/profile/wishlist', { countryId: id });
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  
  const handleMarkAsVisited = async () => {
    try {
      await api.post('/users/profile/visited', { countryId: id });
      alert('Marked as visited!');
    } catch (error) {
      console.error('Error marking as visited:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await api.post('/users/profile/comments', { countryId: id, text: comment });
      setComment('');
      alert('Comment added!');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!country) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {country ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {country.name}
              </Typography>
              <img src={country.imageUrl} alt={`Flag of ${country.name}`} style={{ width: '100%', maxWidth: '300px', marginBottom: '1rem' }} />
              <Typography variant="h6">Capital: {country.capital}</Typography>
              <Typography variant="body1">Population: {country.population.toLocaleString()}</Typography>
              <Typography variant="body1">Languages: {country.languages.join(', ')}</Typography>
              <Typography variant="body1">Currency: {country.currency}</Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Landmarks</Typography>
              <List>
                {country.landmarks.map((landmark, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={landmark.name}
                      secondary={`${landmark.description} Location: ${landmark.location}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Cultural Information</Typography>
            <Typography variant="body2">Greetings: {country.culturalInfo.greetings}</Typography>
          <Typography variant="body2">Customs: {country.culturalInfo.customs}</Typography>
          <Typography variant="body2">Etiquette: {country.culturalInfo.etiquette}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Religion</Typography>
          <Typography variant="body2">Main Religions: {country.culturalInfo.religion.mainReligions.join(', ')}</Typography>
          <Typography variant="body2">Practices: {country.culturalInfo.religion.practices}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Family</Typography>
          <Typography variant="body2">Naming Conventions: {country.culturalInfo.naming.conventions}</Typography>
          <Typography variant="body2">Addressing Others: {country.culturalInfo.naming.addressingOthers}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Dates of Significance</Typography>
          <Typography variant="body2">National: {country.culturalInfo.datesOfSignificance.national.join(', ')}</Typography>
          <Typography variant="body2">Religious: {country.culturalInfo.datesOfSignificance.religious.join(', ')}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Communication</Typography>
          <Typography variant="body2">Verbal Patterns: {country.culturalInfo.communication.verbalPatterns}</Typography>
          <Typography variant="body2">Non-Verbal Customs: {country.culturalInfo.communication.nonVerbalCustoms}</Typography>
          
          <Typography variant="subtitle1" gutterBottom>Business Culture</Typography>
          <Typography variant="body2">Norms: {country.businessCulture.norms}</Typography>
          <Typography variant="body2">Etiquette: {country.businessCulture.etiquette}</Typography>
          </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}


{authenticated && (
        <Box sx={{ mt: 4 }}>
          <Button onClick={handleAddToWishlist} variant="contained" color="primary" sx={{ mr: 2 }}>
            Add to Wishlist
          </Button>
          <Button onClick={handleMarkAsVisited} variant="contained" color="secondary">
            Mark as Visited
          </Button>
          <TextField
            fullWidth
            margin="normal"
            label="Add a comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleAddComment} variant="contained" color="primary">
            Add Comment
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CountryDetailPage;
