"use client";

import './NavbarFooter.scss';
import React, { useState, useEffect, } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'; // Adjust the import path as necessary

const NavbarFooter = ({open}) => {


  return (
    <div className="navbar-footer">
      <div>
        <ThemeToggle open={open}/>
      </div>
    </div>
  );
}

export default NavbarFooter;