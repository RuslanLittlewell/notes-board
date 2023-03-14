import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import NotesList from 'features/notes-list';
import MainPage from './main-page';
import Note from './note';

import './style.scss';

// const MainPage = lazy(() => import("./main-page"));
// const Note = lazy(() => import("./note"));

export const Routing: React.FC = () => {
  return (
    <div className="main-wrapper">
      <NotesList />
      <Fragment>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<Note />} />
        </Routes>
      </Fragment>
    </div>
  );
};
