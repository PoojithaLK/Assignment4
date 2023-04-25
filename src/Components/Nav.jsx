import React from 'react'
import { Link } from 'react-router-dom';
import {FaHome} from "@react-icons/all-files/fa/FaHome"
import GoogleApiCall from './NewsFeed';
const Nav = () => {
    
    return (
        <nav className='nav'>
         <div className="button">
            <Link to = '/'><button><span><FaHome /></span> BACK TO HOME</button></Link>
        </div>
           <GoogleApiCall />
        </nav>
    )
}

export default Nav
