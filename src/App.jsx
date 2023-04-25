import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import React from 'react'
import Main from './Components/Main';
import BlogPost from './Components/XMLData';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='container'>
        {children}
        <Nav />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  const appTitle = "My React App";
  React.useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);

  return (
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Layout>
              <Main />
            </Layout>} />
          <Route path='/blog/:postTitle' element={<Layout>
              <BlogPost />
            </Layout>} />
            </Routes>
    </BrowserRouter>
  )
}

export default App
