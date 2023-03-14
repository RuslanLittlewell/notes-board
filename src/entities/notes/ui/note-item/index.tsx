import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { deleteNote, selectNote, getActiveNoteId } from 'entities/notes/model';
import iconCross from 'assets/cross-icon.svg';
import { Note } from "../../model";

import styles from "./styles.module.scss";

interface NoteItemProps {
  data: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({
  data,
}) => {

  const dispatch = useDispatch();
  const activeNoteId = useSelector(getActiveNoteId);
  
  const handleDeleteNote = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    dispatch(deleteNote(id))
    dispatch(selectNote(null))

  }
  
  const handleSelectNote = (id: string) => {
    dispatch(selectNote(id))
  }
  if (!data) return null;

  return (
    <Link
      title={`Note#${data.id}`}
      to={data.id}
      className={classNames(styles.root, { [styles.root_active]: data.id === activeNoteId})}
      onClick={() => handleSelectNote(data.id)}
    >
      <button 
        onClick={(e) => handleDeleteNote(e, data.id)}
        className={styles.removeNote}
      >
        <img src={iconCross} alt="remove note" />
      </button>

      <div className={styles.noteContent}>
        <h3>{data.title}</h3>
        <div className={styles.noteContent_dateContent}>
          <time>{data.createDate}</time>
          <span>{data.content.blocks[0].text}</span>
        </div>
      </div>
    </Link>
  );
};

export default NoteItem