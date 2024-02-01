import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Breadcrumbs,
  Link,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import { AccountCircle, GitHub, Twitter, Instagram, Facebook } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserData } from '../hooks/user';
import MonthlyChart from './MonthlyChart';
import IncentivesPieChart from './IncentivesPieChart';

export default function ProfilePage() {
  const { user } = useAuth0();
  const userId = user ? user.sub : null;

  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    contact_number: '',
    city: '',
    state: '',
  });

  const userData = useUserData(userId);

  useEffect(() => {
    if (userData && userData.error) {
      console.error("Error fetching user data:", userData.error);
    } else if (userData) {
      setFormValues({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        password: '',
        address: userData.address || '',
        contact_number: userData.contact_number || '',
        city: userData.city || '',
        state: userData.state || '',
      });
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(`/user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Updated user data:', data);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  const handleCancel = () => {
    // Reset form values to original user data
    setFormValues({
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      email: userData.email || '',
      password: '',
      address: userData.address || '',
      contact_number: userData.contact_number || '',
      city: userData.city || '',
      state: userData.state || '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const badgesData = [
    // 
  ];

  const monthlyData = [
    //
  ];

  const incentivesData = [
    //
  ];

  const profilePictureChange = (event) => {
  
  };

  const profilePicturePreview = null;

  return (
    <section style={{ backgroundColor: '#white' }}>
      <Container className="py-5">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Link color="inherit" href="/user">
                User
              </Link>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item lg={4}>
            <Card>
              <CardContent className="text-center">
                <CardMedia
                  component="img"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />
                <Typography variant="body2" color="textSecondary" component="p" className="mb-1">
                  Full Stack Developer
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className="mb-4">
                  Bay Area, San Francisco, CA
                </Typography>
                <div className="d-flex justify-content-center mb-2">
                  <Button variant="contained" color="primary">
                    Follow
                  </Button>
                  <Button variant="outlined" className="ms-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-0">
                <List component="nav" aria-label="social media links" className="rounded-3">
                  <ListItem>
                    <GitHub color="textSecondary" fontSize="large" />
                    <ListItemText primary="mdbootstrap" />
                  </ListItem>
                  <ListItem>
                    <Twitter color="primary" fontSize="large" />
                    <ListItemText primary="@mdbootstrap" />
                  </ListItem>
                  <ListItem>
                    <Instagram color="secondary" fontSize="large" />
                    <ListItemText primary="mdbootstrap" />
                  </ListItem>
                  <ListItem>
                    <Facebook color="primary" fontSize="large" />
                    <ListItemText primary="mdbootstrap" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={8}>
            {/* Rest of your JSX code */}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
