import { ReactNode } from 'react'
import iconNote from 'assets/note-icon.svg';
import styles from './styles.module.scss';

const MainPage: React.FC = () => {

  const renderPlaceholder = (): ReactNode => <div className={styles.root}>
  <div>
    <img src={iconNote} alt="note" />
    <h1>Select or create note</h1>
  </div>
</div>

  return (
   <div>{renderPlaceholder()}</div>
  );
};


export default MainPage;
