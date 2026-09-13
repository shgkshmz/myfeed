import {HashRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import Post from './pages/Post';
import './App.css'
import './assets/skeleton.css'
import './assets/normalize.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div className='container'>   
      <HashRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/about" element={<About/>}> </Route>
          <Route path='/posts/:id' element={<Post/>}> </Route>
        </Routes>
         <Footer></Footer>
      </HashRouter>
    </div>
  )
}

export default App
