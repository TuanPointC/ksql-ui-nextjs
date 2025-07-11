"use client";


import './NavbarFooter.scss';
import React, { useState, useEffect, } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEndpointStore } from '@/store';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'; // Adjust the import path as necessary

const NavbarFooter = (props) => {
  const [current, setCurrent] = React.useState('');
  const [values, setValues] = useState([]);
  const { endpoints, setCurrentEndpoint } = useEndpointStore();

  useEffect(() => {
    if (endpoints && endpoints.length > 0) {
      const endpointNames = endpoints.map(endpoint => endpoint.split('=')[0]);
      setValues(endpointNames);
      setCurrent(endpointNames[0] || '');
    }
  }, [endpoints]);

  const handleChange = (event) => {
    setCurrent(event.target.value);
    const selectedEndpoint = endpoints.find(endpoint => endpoint.startsWith(event.target.value));
    if (selectedEndpoint) {
      setCurrentEndpoint(selectedEndpoint);
    }
  };
  return (
    <div className="navbar-footer">
      <div>
        {/* <FormControl
          className={props.open ? 'select-env-big' : 'select-env-small'}
          size="small">
          <InputLabel
            className='label'
            sx={{
              color: 'white',
              '&.Mui-focused': { color: 'white' }
            }}
          >
            ENV
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={current}
            label="ENV"
            onChange={handleChange}
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '.MuiSvgIcon-root': { color: 'white' }
            }}
          >
            {values.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default NavbarFooter;