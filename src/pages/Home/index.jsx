import React, { useState } from 'react';
import {
  Box, TextField, Button, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Checkbox, RadioGroup, Radio, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  // const casesAllotted = [{ch:1,list:1,serial:1},{ch:2,list:1,serial:2}]
  const [formData, setFormData] = useState({
    courtHall: '', list: '', serial: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
 
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
 
   
    // setFormData((prev) => ({
    //   ...prev,
    //   [name]: type === "checkbox" ? checked : value,
    // }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
     const storageData = JSON.parse(localStorage.getItem("myCases") || "[]");
    storageData.push({ ch: formData.courtHall, list: formData.list, serial: formData.serial });
    localStorage.setItem("myCases", JSON.stringify(storageData));
    console.log('Form submitted:', formData);
    // Navigate to success screen
    navigate('/listing');
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" align="center">
        MUI Form
      </Typography>
      <TextField
        label="Court Hall"
        name="courtHall"
        value={formData.courtHall}
        onChange={handleChange}
        required
      />
      <TextField
        label="List"
        name="list"
        value={formData.list}
        onChange={handleChange}
        required
      />
      <TextField
        label="Serial"
        name="serial"
        value={formData.serial}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained">
        Submit
      </Button>
      <Button variant="contained" onClick={()=>{localStorage.clear()}}>Reset</Button>
    </Box>
  );
}
