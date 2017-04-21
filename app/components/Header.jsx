import React from 'react'
import {Link} from 'react-router'
import {Navbar, NavItem} from 'react-materialize'

import Login from './Login'
import WhoAmI from './WhoAmI'

/* -------------------<   COMPONENT   >-------------------- */

export const Header = ({ user, logout }) => (
  <Navbar brand='art-shopper' right>
    <NavItem><Link to="/" className="nostyle">Categories</Link></NavItem>
    {
      user ?
      <NavItem onClick={logout}><Link to="/" className="nostyle">Logout {user && user.first_name + " " + user.last_name}</Link></NavItem> :
      <NavItem><Link to="/login" className="nostyle">Login</Link></NavItem>
    }
    <NavItem><Link to="/account" className="nostyle">My Account</Link></NavItem>
    <NavItem><Link to="/" className="nostyle">Cart</Link></NavItem>
  </Navbar>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'
import {logout} from 'APP/app/reducers/auth'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(Header)

