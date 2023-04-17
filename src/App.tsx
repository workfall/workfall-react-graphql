import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from './views/ListUsers';
import CreateUserForm from './components/CreateUserForm';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListUsers />}></Route>
          <Route path="/create-user" element={<CreateUserForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
