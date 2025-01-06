import React from 'react';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/userContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <UserProvider>
        <AppRoutes />
        <ToastContainer
          autoClose={2000}
          draggable={true}
          pauseOnHover={false}
          newestOnTop={false}
          limit={2}
        />
      </UserProvider>
    </>
  )
}

export default App
