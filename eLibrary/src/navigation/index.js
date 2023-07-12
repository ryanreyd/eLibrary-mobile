import React from 'react';
import Routes from './Routes';
import { AuthPovider } from './AuthProvider';

// just to wrap and export routes with 
// authentication provider
const Providers = () => {
  return (
    <AuthPovider>
      <Routes/>
    </AuthPovider>
  );
};

export default Providers;