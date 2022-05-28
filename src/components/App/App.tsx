import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import Dashboard from '../Dashboard';
import PageNotFound from '../PageNotFound';
import { StyledEngineProvider } from '@mui/material/styles';

import ViewUserCard from '../ViewUserCard';

export interface AppProps {}

const App = () => {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/:id" element={<ViewUserCard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
