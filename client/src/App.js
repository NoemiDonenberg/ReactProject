import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './user/login';
import Header from './components/header';
import Footer from './components/footer';

import './App.css';
import Signin from './user/signin';
import Homepage from './components/homepage';
import AllRecipes from './components/allRecipes';
import ListRecipe from './components/listRcipe';
import AddRecipe from './components/addRecipe';
import EditRecipe from './components/editRecipe.js';
import Cart from './components/cart.js';

import PrivateRoute from './user/privateRoute';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GET_CATEGORY } from './redux/action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:8080/api/category")
      .then(res => {
        dispatch({ type: GET_CATEGORY, data: res.data })
      })
      .catch(error => console.log(error))

  })
  return (
    <div className="App">
      <Router>
        <Header> </Header>




        <Routes>
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/signin' element={<Signin />} /> */}
          {/* <Route path='/allRecipes/${r.Id}' element={<Homepage />}/> */}
          {/* <Route path='/allRecipes/:id' element={<AllRecipes />} />  */}

          {/* <Route path='/listRecipe' element={<ListRecipe/>}/> */}
          {/* <Route path='/allRecipes' element={<AllRecipes/>}/> */}

          {/* <Route path='/allRecipes/:id' element={<AllRecipes />} /> נתיב חדש עבור AllRecipes */}

          {/* <Route path='/addRecipe' element={<AddRecipe/>}/> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />

          <Route path='/homepage' element={<PrivateRoute element={Homepage} />} />
          <Route path='/listRecipe' element={<PrivateRoute element={ListRecipe} />} />
          <Route path='/addRecipe' element={<PrivateRoute element={AddRecipe} />} />
          <Route path='/editRecipe/:id' element={<PrivateRoute element={EditRecipe} />} />
          <Route path='/cart' element={<PrivateRoute element={Cart} />} />

          {/* נתיב דינמי עבור כל מתכון לפי ה-ID */}
          <Route path='/allRecipes/:id' element={<PrivateRoute element={AllRecipes} />} />

        </Routes>



        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
