
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Users from './Users';
function App() {
  const [count, setCount]= useState(0)
  
    return (
      <div>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/update' element={<UpdateUser />}></Route>
        </Routes>
        
        </BrowserRouter>
     
         </div>
    )
  }
  
  export default App