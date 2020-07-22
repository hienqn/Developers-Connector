import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> Codesmith Connector
        </Link>
        {/* <a href="index.html"><i className="fas fa-code"></i> Codesmith Connector </a> */}
      </h1>
      <ul>
        <li>
          <Link to='/profile'>
            Developers
          </Link>
          {/* <a href="profiles.html">Developers</a> */}
        </li>
        <li>
          <Link to='/register'>
            Register
          </Link>
          {/* <a href="register.html">Register</a> */}
          </li>
        <li>
          <Link to='/login'>
            Login
          </Link>
          {/* <a href="login.html">Login</a> */}          
          </li>
      </ul>
    </nav>
  )
}

export default Navbar;