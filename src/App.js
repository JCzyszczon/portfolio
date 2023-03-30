import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/index.jsx';
import Navbar from './pages/navbar';
import { ParallaxProvider } from 'react-scroll-parallax';
import Project from './pages/project';

function App() {

  return (
    <ParallaxProvider>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/projects/:name' element={<Project/>} />
      </Routes>
    </ParallaxProvider>
  );
}

export default App;
