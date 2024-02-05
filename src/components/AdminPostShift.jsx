
import React, { useState, useEffect } from 'react';
import { Container, Button, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

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


const PostShiftForm = () => {

  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [formData, setFormData] = useState({
    facility: '',
    address: '',
    workerType: '',
    rate: '',
    gender: '',
    duration: '',
    startDate: '',
    startTime: '',
    latitude,
    longitude
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


    useEffect(() => {
   
    console.log(formData);
  }, [formData]); 

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formData.address
        )}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);

        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude: location.lat,
          longitude: location.lng,
        }));
      }
    } catch (error) {
      console.error('Error fetching geocode data', error);
    }

  };

  return (
    <>
      <h1 className="text-6xl p-8 text-[#24233E] text-center">Post a Shift</h1>
      <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5" >

        <form onSubmit={handleFormSubmit} className="space-y-4" >
          <Input fullWidth
            label="Facility Name"
            name="facility"
            value={formData.facility}
            onChange={handleInputChange}
          />

          <Input fullWidth
            label="Facility Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth >
                <FormLabel component="legend">Type of Worker</FormLabel>
                <RadioGroup
                  row
                  aria-label="workerType"
                  name="workerType"
                  value={formData.workerType}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="nurse"
                    control={<Radio />}
                    label="Registered Nurse"
                  />
                  <FormControlLabel
                    value="psw"
                    control={<Radio />}
                    label="Personal Support Worker"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <FormControl fullWidth >
            <FormLabel component="legend">Gender</FormLabel>
            <Select
              value={formData.gender}
              onChange={handleInputChange}
              name="gender"
            >
              <MenuItem value="any">Any</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} >
            <Grid item xs={6}>
              <Input fullWidth
                label="Rate"
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input fullWidth
                label="Shift duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Input fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Input fullWidth
                label="Start Time"
                type="time"
                name="startTime"
                value={formData.startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
                inputProps={{
                  step: 300,
                }}
              />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#6547A5', color: 'white' }}>
            Post a Shift
          </Button>
        </form>
      </Container>
    </>
  );
};

export default PostShiftForm;
