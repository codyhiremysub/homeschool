import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const PublicRouteWrapper = () => (
  <>
    <ToastContainer className='mt-16' />
    <Outlet />
  </>
);

export default PublicRouteWrapper;
