import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNote,
  selectNotes,
  selectFilteredNotes,
  cloneCurrentNotes,
  resetSearchValues,
 } from 'entities/notes/model';
import { RawDraftContentState } from "react-draft-wysiwyg";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import NoteItem from 'entities/notes/ui/note-item';
import iconPlus from 'assets/plus-icon.svg';
import iconSearch from 'assets/search-icon.svg';

import './style.scss';
import Search from 'features/search-notes';


const NotesList: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const filteredNotes = useSelector(selectFilteredNotes);
  const [isSearchActive, setSearchActive] = useState(false);

  const handleAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Новая заметка',
      content: {
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "btsan",
          text: "Type your note",
          type: "unstyled"
        }],
        entityMap: {}
      } as RawDraftContentState,
      createDate: moment().format('DD/MM/YYYY'),
    };

    dispatch(addNote(newNote));
  }
  const handleCancelSearch = () => {
    dispatch(resetSearchValues());
    setSearchActive(false);
  }

  const handleStartSearch = () => {
    dispatch(cloneCurrentNotes());
    setSearchActive(true);
  }
  const renderNotes = () => (isSearchActive ? filteredNotes : notes).map(note => <NoteItem data={note} key={note.id} />)

  return (
    <div className="notes">
      {isSearchActive ? <Search cancelSearch={handleCancelSearch} /> :
        <h2>Notes <button onClick={() => handleStartSearch()}><img src={iconSearch} alt="search" /></button></h2>}
      <div className="notes-list">
        {renderNotes()}
      </div>

      <div className="notes-action">
        <button onClick={handleAddNote}>
          <img src={iconPlus} alt="add note" />
        </button>
      </div>
    </div>
  );
}


export default NotesList;
