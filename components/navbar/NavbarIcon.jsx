"use client";

import React from 'react'
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';

import './NavbarIcon.scss'; // Assuming you have a CSS file for styling

const NavbarIcon = (props) => {
  const toggle = () => {
    props.setOpen(!props.open);
  }
  return (
    <div className='nav-icon'>
      <Link href="/" className='nav-icon-link'>
        <img
          src='/logo/logo.png'
          alt="Logo"
          className={props.open ? 'nav-icon-logo-big' : 'nav-icon-logo-small'}
        />
      </Link>
      <IconButton onClick={toggle} className='nav-icon-button'>
        {props.open ?
          <ChevronLeftIcon sx={{ color: 'white' }} /> :
          <ChevronRightIcon sx={{ color: 'white' }} />}
      </IconButton>
    </div>
  )
}

export default NavbarIcon