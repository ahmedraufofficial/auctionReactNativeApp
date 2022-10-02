import React from 'react'
import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('md-eye');
  
    const handlePasswordVisibility = () => {
      if (rightIcon === 'md-eye') {
        setRightIcon('md-eye-off');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'md-eye-off') {
        setRightIcon('md-eye');
        setPasswordVisibility(!passwordVisibility);
      }
    };
  
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
  };
