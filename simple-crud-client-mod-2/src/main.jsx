import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './components/users.jsx';
import Update from './components/Update.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch('http://localhost:5000/users')
    // ai link ta server theke anchi that contains all the users that we inserted in the databse(method:post)
    // by the form now get this data form database and first show it in the server UI then make sure and use this
    // link in the client side to show all the users form database to the client
  },



  {
    // update jei id diye hobe click korle--- 2ta link update thakay shei update r dynamic id ekhane chole ashbe
    path: '/update/:id',
    element: <Update></Update>,
    // akhn server er amon URL k call korte hobe jeta amr ai update r jonno click kora id ta k niye call kore
    // shei id r full single data ta amdr dibe (shei full data k amra update component useloader diye recive korbo)
    // tai ekhane fetch r jonno age server r api baniye ashte hobe shei id o hobe dynamic atar sathe connected
    // manually check kore dekhbo server e dynamic id dile shei single data pacchi kina pele shei URL ekhane user korbo
    // amr ai id jonno
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
    // uporer id diye call korte hole params diye eibbabe niye hobe id k 

    // ** R ata ready (made server api) just dynamic id thakbe (server theke shob toyri kora ai api jebhabe database
    // theke find korte hoy shob ready kora r id ta :id dynamic kora rakha hoice jate dynamically call kora jete pare)
    // http://localhost:5000/users/645e919254b20c34039826da 
    // ata dile static call hobe server e then
    // amke data theke findone kore akta full data details dibe kintu ami click r sathe dynamic korbo tai 
    // :id part ta k dynamic korbo <update> btn r link r sathe
    // ** ai server api k call kore jah pabo sheta update component useloader diye recieve kore dekhabo form r defaultValue hishebe
  }



]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
