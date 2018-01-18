import React from 'react'

export default () => (
  <div className="form-group">
    <div className="card">
      <div className="card-body">
        <div className="form-group">
          <h3>Connection <i className='fa fa-circle text-danger float-right'/></h3>
        </div>
        <div className="form-group">
          App ID
          <input type="text" className='form-control'/>
        </div>
        <div className="form-group">
          App Key
          <input type="text" className='form-control'/>
        </div>
        <div className="form-group">
          App Secret
          <input type="text" className='form-control'/>
        </div>
        <div className="form-group">
          <button type='button' className='btn btn-success' style={{width: '100%'}}>
            <i className='fa fa-globe'/> Connect
          </button>
        </div>
      </div>
    </div>
  </div>
)