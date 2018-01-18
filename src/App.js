import React, { Component } from 'react'
import logo from './logo.svg'
import Navbar from './components/Navbar'
import Connection from './components/Connection.js'
import Publish from './components/Publish'
import Subscription from './components/Subscription'
import Message from './components/Message'

class App extends Component {
  render () {
    return (
      <div className="container">
        <Navbar/>
        <div className="row">
          <div className="col-3" style={{marginTop: 20}}>
            <Connection/>
            <Publish/>
          </div>
          <div className="col-9" style={{marginTop: 20}}>

            <div className="form-group">
              <div className="form-group">
                <h3>Subscription</h3>
              </div>
              <Subscription/>
            </div>

            <div className="form-group">
              <div className="form-group">
                <h3>Messages</h3>
              </div>
              <Message/>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App
