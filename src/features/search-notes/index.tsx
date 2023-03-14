import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchNotes } from 'entities/notes/model';
import iconCross from 'assets/cross-icon.svg';
import './style.scss';

type CancelFunctionProp = () => void;

interface NoteSearchProps {
  cancelSearch: CancelFunctionProp,
}
const Search: React.FC<NoteSearchProps> = ({ cancelSearch }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(searchNotes(e.target.value));
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search Notes"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <button onClick={() => cancelSearch()}><img src={iconCross} alt="close search" /></button>
    </div>
  );
}

export default Search;