import { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { selectSelectedNote } from 'entities/notes/model';
import NoteEditor from 'features/note-editor';
import iconNote from 'assets/note-icon.svg';
import styles from './styles.module.scss';

const Note: React.FC = () => {
  const activeNote = useSelector(selectSelectedNote);

  const renderPlaceholder = (): ReactNode => <div className={styles.root}>
    <div>
      <img src={iconNote} alt="note" />
      <h1>Select or create note</h1>
    </div>
  </div>
  
  return (
    <div>
      {activeNote
        ? <NoteEditor />
        : renderPlaceholder()}
    </div>
  );
};


export default Note;
