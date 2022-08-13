import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import NotesService from "../services/NotesService";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    NotesService.getAll()
      .then((response) => {
        console.log("printing response", response.data);
        setNotes(response.data);
      })
      .catch((response) => {
        console.log("Something went wrong", console.error());
      });
  }, []);

  return (
    <div className="main-content">
      <h1>List of Notes</h1>
      <div className="notes-list mt-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="notes-preview mt-3">
              <Link to={`/notes/${note.id}`}>
                <h5 className="primary-color text-capitalize">{note.title}</h5>
                <Moment fromNow className="text-italic">
                  {note.updatedAt}
                </Moment>
              </Link>
            </div>
          ))
        ) : (
          <div>No Notes Available</div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
