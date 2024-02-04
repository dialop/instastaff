import React, { useState } from 'react';
import { TextField, Button, Avatar, Typography, Container } from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react'

const RegistrationForm = () => {
  const { user } = useAuth0();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    handle: '',
    email: '',
    password: '',
    profile_picture: '',
    gender: '',
    occupation: '',
    license: '',
    points: 0, // Default value, not required in form
    badge_id: null, // Assuming this is managed elsewhere
    last_login: new Date().toISOString(), // Managed by the backend
    token: '' // Managed by the backend
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you will call your API to submit the form data
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h5" className="text-center mb-5">{user ? `${user.given_name}, let's complete your registration.` 
        : 'Please complete the registration form.'}
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          <Avatar src={formData.profile_picture}>
            <CameraAltIcon />
          </Avatar>
        </div>
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Username"
          name="handle"
          value={formData.handle}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          type="email"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          type="password"
        />
        <TextField
          fullWidth
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="License"
          name="license"
          value={formData.license}
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-5"
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
