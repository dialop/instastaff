import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/material/styles';
import { useRegistration } from '../../context/RegistrationContext';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Snackbar
} from '@mui/material';

const Input = styled(TextField)({
  '& label.Mui-focused': {
    color: '#6547A5',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#6547A5',
    },
  },
});

const RegistrationForm = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    handle: '',
    email: '',
    password: '',
    profile_picture: '',
    gender: 'Female',
    occupation: 'Super Nurse',
    license: 'RN007',
    badge_id: null,
    points: 0,
  });
  const [formVisible, setFormVisible] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { isRegistered, setIsRegistered } = useRegistration();

  useEffect(() => {
    if (user) {
      const handle = `${user.given_name || ''}${user.family_name ? `_${user.family_name}` : ''}`.toLowerCase();
      setFormData(prevState => ({
        ...prevState,
        first_name: user.given_name || '',
        last_name: user.family_name || '',
        email: user.email || '',
        profile_picture: user.picture || '',
        handle,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently();
      console.log(formData, accessToken);
      // Add your logic here to send data to the backend
      setIsRegistered(true);
      setFormVisible(false);
      console.log("Setting Snackbar Open");
      setSnackbarOpen(true);
      alert("Registration complete. Welcome aboard!");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  if (!isAuthenticated || isRegistered) {
    return null;
  }

  return (
    <>
      {formVisible && (
        <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
          <Typography variant="h5" className="text-center mb-4 font-bold">Complete Registration</Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input fullWidth label="First Name" name="first_name" variant="outlined" value={formData.first_name} onChange={handleChange} />
            <Input fullWidth label="Last Name" name="last_name" variant="outlined" value={formData.last_name} onChange={handleChange} />
            <Input fullWidth label="Email" name="email" variant="outlined" value={formData.email} onChange={handleChange} />
            <Input fullWidth label="Username" name="handle" variant="outlined" value={formData.handle} onChange={handleChange} />
            <Input fullWidth label="Gender" name="gender" variant="outlined" value={formData.gender} onChange={handleChange} />
            <Input select fullWidth label="Occupation" name="occupation" variant="outlined" value={formData.occupation} onChange={handleChange}>
              <MenuItem value="Personal Support Worker">Personal Support Worker</MenuItem>
              <MenuItem value="Registered Nurse">Registered Nurse</MenuItem>
              <MenuItem value="Super Nurse">Super Nurse</MenuItem>
            </Input>
            <Input fullWidth label="License" name="license" variant="outlined" value={formData.license} onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#6547A5', color: 'white' }}>
              Submit
            </Button>
          </form>
        </Container>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Registration complete. Welcome aboard!"
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </>
  );
};

export default RegistrationForm;
