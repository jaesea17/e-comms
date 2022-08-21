import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import CreateProduct from './components/pages/CreateProduct';
import UpdateProduct from './components/pages/UpdateProduct';
import { PrivateRoutes } from './utils/PrivateRoutes';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="update-product" element={<UpdateProduct />} />
      </Route>
    </Routes>
  )
}

export default App
