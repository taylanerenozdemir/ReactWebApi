import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Home} from './components/Home.js';
import { Departments } from './components/Departments.js';
import { Employees } from './components/Employees.js';
import { BrowserRouter, Routes, Route } from "react-router";
import {Navigation} from './components/Navigation.js'

function App() {
  return (
    <BrowserRouter>
    <h3 className='m-3 d-flex justify-content-center'>
      React JS With Bootstrap
    </h3>
    <h5 className='m-3 d-flex justify-content-center'>
      Employee Management Portal
    </h5>
    
    <Navigation/>
    <Routes>
      <Route path='/' element={<Home/>} exact></Route>
      <Route path='/employees' element={<Employees/>} exact></Route>
      <Route path='/departments' element={<Departments/>} exact></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
