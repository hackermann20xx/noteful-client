import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import Context from '../context'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';


export default class NotePageNav extends React.Component {

static contextType = Context;

  render(){
    const { noteId } = this.props.match.params;
        const note = findNote(this.context.notes, noteId) || {};
        const folder = findFolder(this.context.folders, note.folderId);




    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
  


  }

  

