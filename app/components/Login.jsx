import React from 'react'
import {Input, Row, Col} from 'react-materialize'

export const Login = ({ login }) => (
  <Row>
    <Col s={10} m={6} l={3}>
      <p className="caption"> Login </p>
      <form onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.username.value, evt.target.password.value)
      } }>
        <Input name="username" label="Email" s={12}  />
        <Input name="password" label="Password" type="password" s={12} />
        <Input type="submit" value="Login" />
      </form>
    </Col>
  </Row>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)



