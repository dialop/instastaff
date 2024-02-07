
import React, { useState, useEffect } from 'react';
import { Container, Button, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    facility_name: '',
    title: '',
    rate: '',
    gender: '',
    duration: '',
    date: '',
    start_time: '',
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
      console.log('Submitting form...');
      const postingResponse = await fetch('/post-shift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
        }),
      });

      if (!postingResponse.ok) {
        console.error('Failed to submit form:', postingResponse.status, postingResponse.statusText);
        return;
      }
  
      console.log('Form submitted successfully:', postingResponse);
      
      toast.success('Shift booked successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      navigate('/jobs');
    } catch (error) {
      console.error('Error during posting process', error);
    }

  };


  return (
    <>
      <h1 className="text-6xl p-8 text-[#24233E] text-center">Post New Shift</h1>
      <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5" >

        <form className="space-y-4" >
          <FormControl fullWidth required>
            <InputLabel htmlFor="facility_name">Hospital</InputLabel>
            <Select
              value={formData.facility_name}
              onChange={handleInputChange}
              name="facility_name"
              label="Hospital"
            >
              <MenuItem value="Aurelia Medical Group">Aurelia Medical Group</MenuItem>
              <MenuItem value="Veritas Health Systems">Veritas Health Systems</MenuItem>
              <MenuItem value="Elysium Medical Center">Elysium Medical Center</MenuItem>
              <MenuItem value="NeuraMed Nexus">NeuraMed Nexus</MenuItem>
              <MenuItem value="NeuraCore LifeCare">NeuraCore LifeCare</MenuItem>
              <MenuItem value="NeuraSphere Innovare">NeuraSphere Innovare</MenuItem>
              <MenuItem value="RegenXcel MediCare">RegenXcel MediCare</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth required >
                <FormLabel component="legend">Type of Worker</FormLabel>
                <RadioGroup
                  row
                  aria-label="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Registered Nurse"
                    control={<Radio />}
                    label="Registered Nurse"
                  />
                  <FormControlLabel
                    value="Personal Support Worker"
                    control={<Radio />}
                    label="Personal Support Worker"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <FormControl fullWidth required>
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
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input fullWidth
                label="Shift duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Input fullWidth
                label="Start Date"
                type="date"
                name="date"
                value={formData.date}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Input fullWidth
                label="Start Time"
                type="time"
                name="start_time"
                value={formData.start_time}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
                required
                inputProps={{
                  step: 300,
                }}
              />
            </Grid>
          </Grid>

          <Button onClick={handleFormSubmit}  type="button" fullWidth variant="contained" style={{ backgroundColor: '#6547A5', color: 'white' }}>
            Post a Shift
          </Button>
        </form>
      </Container>
    </>

  );
};

export default PostShiftForm;
