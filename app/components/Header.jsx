import React from 'react'
import {Link} from 'react-router'
import {Navbar, NavItem} from 'react-materialize'
import {browserHistory} from 'react-router'

import Login from './Login'
import WhoAmI from './WhoAmI'

/* -------------------<   COMPONENT   >-------------------- */

export const Header = ({ user, logout }) => (
  <Navbar brand='art shopper' right>
    <NavItem><Link to="/" className="nostyle">Home</Link></NavItem>
    <NavItem>
      <form className="nostyle" onSubmit={ (evt) => {
        evt.preventDefault();
        browserHistory.push(
          `/products?search=${evt.target.search.value}`);
      }}>
          <input placeholder="Search by Category" id="search" type="search" name="search" />
      </form>
    </NavItem>
    {
      user ?
        <NavItem onClick={logout}><Link to="/" className="nostyle">Logout {user && user.first_name ? user.first_name + " " + user.last_name : 'OAuth User'}</Link></NavItem> :
      <NavItem><Link to="/login" className="nostyle">Login</Link></NavItem>
    }
    {
      user ? null : <NavItem><Link to="/signup" className="nostyle">Signup</Link></NavItem>
    }
    {
      user ? <NavItem><Link to="/account" className="nostyle">My Account</Link></NavItem> : null
    }
    <NavItem><Link to="/cart" className="nostyle">Cart</Link></NavItem>
  </Navbar>
)

/* -------------------<   CONTAINER   >-------------------- */

import {connect} from 'react-redux'
import {logout} from 'APP/app/reducers/auth'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(Header)
