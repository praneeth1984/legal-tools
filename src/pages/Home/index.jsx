import React, { useState } from 'react';
import {
  Box, TextField, Button, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Checkbox, RadioGroup, Radio, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', email: '', gender: '', country: '', agree: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Navigate to success screen
    navigate('/listing');
  };

  return (
    <Box component="form" sx={{ maxWidth: 400, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
      <Typography variant="h5" align="center">MUI Form</Typography>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Select name="country" value={formData.country} onChange={handleChange} required>
          <MenuItem value="india">India</MenuItem>
          <MenuItem value="usa">USA</MenuItem>
          <MenuItem value="uk">UK</MenuItem>
        </Select>
      </FormControl>
      <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <FormControlLabel
        control={<Checkbox checked={formData.agree} onChange={handleChange} name="agree" />}
        label="I agree to the terms"
      />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
}
