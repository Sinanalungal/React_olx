import { useState } from 'react'
import './App.css'
import Navbar from './navbar/navbar'
import SecondNavbar from './navbar/SecondNavbar'
import CardAdding from './CardAddingComponent/CardAdding'
import Footer from './Footer/Footer'
import ProductContent from './ProductContent/ProductContent'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Sell from './Sell/Sell'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Layout'
// info
// 1.CardAdding is the home page

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<CardAdding/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/sell' element={<Sell/>}/>
      <Route path='/productdetails' element={<ProductContent/>}/>
    </Routes>
    </BrowserRouter>
    {/* <Navbar/> */}
    {/* <Sell/> */}
    {/* <Signup/> */}
    {/* <Login/> */}
    {/* <ProductContent/> */}
    {/* <SecondNavbar/>
    <CardAdding/> */}
    {/* <Footer/> */}
    </>
  )
}

export default App