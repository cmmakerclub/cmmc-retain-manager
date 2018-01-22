import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Connection from './components/Connection.js'
import Publish from './components/Publish'
import Subscription from './components/Subscription.js'
import Message from './components/Message'
import store from './flux/Store'
import uuid from 'uuid'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      connection: false
    }

    store.addListener(() => {
      let sortByUNIX = store.state.messageArrived.sort((a, b) => {
        return b.unix - a.unix
      })

      this.setState({
        messages: sortByUNIX,
        connection: store.state.connection
      })
    })
  }

  render () {
    return (
      <div className="container">
        <Navbar/>
        <div className="row">
          <div className="col-3" style={{marginTop: 20, display: this.state.connection && 'none'}}>
            <Connection/>
            {/*<Publish/>*/}
          </div>
          <div className={this.state.connection ? 'col-12' : 'col-9'} style={{marginTop: 20}}>

            {/*<div className="form-group">*/}
            {/*<div className="form-group">*/}
            {/*<h3>Subscription</h3>*/}
            {/*</div>*/}
            {/*<Subscription/>*/}
            {/*</div>*/}

            <div className="form-group">
              <div className="form-group">
                <h3>Messages</h3>
              </div>
              {this.state.messages.map(object => <Message key={uuid()} data={object}/>)}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App
