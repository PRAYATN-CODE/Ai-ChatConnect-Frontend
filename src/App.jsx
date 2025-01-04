import React from 'react';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/userContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <UserProvider>
        <AppRoutes />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
