import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home';
import Cart from './components/Cart';



function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} exact/>
      <Route path='/cart' element={<Cart/>} exact/>
    </Routes>
    </>
  );
}

export default App;
