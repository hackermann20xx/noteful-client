import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import { getNotesForFolder, findNote } from '../notes-helpers';
import Context from '../context';
import './App.css';

class App extends Component {
  fetchapi(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data
      })
  }

  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    this.fetchapi('http://localhost:9090/folders')
      .then(data => this.setState({ ...this.state, folders: data }))

    this.fetchapi('http://localhost:9090/notes')
      .then(data => this.setState({ ...this.state, notes: data }))
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageMain} 
        />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <Context.Provider value={{ ...this.state }}>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
