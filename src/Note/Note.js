import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import Context from '../context'

function deleteNoteApi(id, callback) {
  fetch(`http://localhost:9090/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  }).then(response => {
    if (response.ok) {
      callback(id)
    }
  })
}

export default class Note extends React.Component {

  static contextType = Context;

  render(){
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button className='Note__delete' 
        type='button' 
        onClick={()=>{deleteNoteApi(this.props.id, this.context.deleteNote)}}
      >
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}
