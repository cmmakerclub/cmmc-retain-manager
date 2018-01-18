import React, { Component } from 'react'
import Dispatcher from '../flux/Dispatcher'
import TypeActions from '../flux/Constants'
import store from '../flux/Store'

export default class Connection extends Component {

  constructor (props) {
    super(props)
    this.state = {
      host: 'mqtt.cmmc.io',
      port: 9001,
      clientId: `CMMC-${parseFloat(Math.random() * 100).toFixed(4)}`,
      classConnecting: 'fa fa-circle text-danger float-right'
    }

    store.addListener(() => {
      // console.log(store.state)
      if (store.state.connecting) {
        this.setState({
          classConnecting: 'fa fa-circle text-success float-right'
        })
      }
    })
  }

  handleOnConnect = (e) => {
    e.preventDefault()
    console.log(this.state)
    Dispatcher.dispatch({
      type: TypeActions.CONNECTING,
      data: this.state
    })
  }

  render () {
    return (
      <div className="form-group">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <h3>Connection <i className={this.state.classConnecting}/></h3>
              </div>
              <div className="form-group">
                Host
                <input type="text" className='form-control' defaultValue={'mqtt.cmmc.io'}
                       onChange={e => this.setState({host: e.target.value})}/>
              </div>
              <div className="form-group">
                Port
                <input type="text" className='form-control' defaultValue={9001}
                       onChange={e => this.setState({port: e.target.value})}/>
              </div>
              <div className="form-group">
                ClientID
                <input type="text" className='form-control' defaultValue={this.state.clientId} disabled/>
              </div>
              <div className="form-group">
                <button type='button' className='btn btn-success' style={{width: '100%'}}
                        onClick={e => this.handleOnConnect(e)}>
                  <i className='fa fa-globe'/> Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

}