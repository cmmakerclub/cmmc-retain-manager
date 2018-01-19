import React from 'react'

export default (props) => {

  let data = props.data

  return (
    <div className="form-group">
      <div className="card">
        <div className="card-body">
          <small className='text-primary'>
            {data.timestamp}&ensp;&ensp;
            Topic:{data.destinationName}&ensp;&ensp;
            Qos:{data.qos}&ensp;&ensp;
            Retain: {data.retained ? 'true' : 'false'}
          </small>
          <button type='button' className='btn btn-danger float-right' style={{display: !data.retained && 'none'}}><i className='fa fa-remove'/> Retain</button>
          <br/>
          <br/>
          {data.payloadString}
        </div>
      </div>
    </div>
  )
}