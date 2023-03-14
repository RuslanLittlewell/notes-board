import { ChangeEvent, ReactNode, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'helpers/debounce';
import { editNote, selectSelectedNote, getActiveNoteId } from 'entities/notes/model';
import { EditorState } from 'draft-js';
import { Editor, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from './styles.module.scss';

const NoteEditor: React.FC = () => {

  const activeNote = useSelector(selectSelectedNote);
  const activeNoteId = useSelector(getActiveNoteId)
  const [titleValue, setTitleValue] = useState('');
  const editor = useRef(null);

  useEffect(() => {
    if(activeNote) {      
      setTitleValue(activeNote.title);
    }
  }, [activeNoteId])
  const dispatch = useDispatch();
  
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    
    if (activeNote) {
      dispatch(editNote({
        ...activeNote,
        title: event.target.value,
      }));
    }
  }
  const handleChangeContent = (data: RawDraftContentState) => {
    if (activeNote) {
      dispatch(editNote({
        ...activeNote,
        content: data,
      }))
    }
  }
  const debouncedTitleChange = debounce(handleChangeContent, 300);

  const renderNoteEditor = (): ReactNode => {
    return <div className={styles.editor}>
      <input type="text" value={titleValue} onChange={handleChangeTitle}/>
      <Editor
        ref={editor}
        placeholder="Type your note ..."
        onChange={(value) => debouncedTitleChange(value)}
        contentState={activeNote?.content}
      />
    </div>
  }


  return (
    <div className={styles.root}>
      {renderNoteEditor()}
    </div>
  );
};


export default NoteEditor;
