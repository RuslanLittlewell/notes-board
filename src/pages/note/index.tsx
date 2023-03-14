import { useSelector } from 'react-redux';
import { selectSelectedNote } from 'entities/notes/model';
import NoteEditor from 'features/note-editor';

const Note: React.FC = () => {
  const activeNote = useSelector(selectSelectedNote);

  
  return (
    <div>
      <NoteEditor />
    </div>
  );
};


export default Note;
