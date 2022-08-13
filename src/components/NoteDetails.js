import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import NotesService from "../services/NotesService";

const NoteDetails = () => {
  const { id } = useParams();
  const [currentNote, setCurrentNote] = useState("");
  const history = useHistory();
  useEffect(() => {
    NotesService.get(id)
      .then((note) => {
        setCurrentNote(note.data);
      })
      .catch((error) => {
        console.log("Something went wrong...", console.error());
      });
  });

  const handleDelete = (e) => {
    NotesService.remove(id)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const handleUpdate = () => {
    history.push(`/notes/edit/${id}`);
  };
  return (
    currentNote && (
      <div className="note-details main-content">
        <article>
          <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
          <div className="mb-3 font-italic metadata">
            <Moment fromNow>{currentNote.updatedAt}</Moment>
            <span className="text-capitalize">, {currentNote.category}</span>
          </div>
          <div className="mb-3">{currentNote.body}</div>
        </article>
        <button className="ml-2" onClick={handleUpdate}>
          Update
        </button>
        <button className="ml-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    )
  );
};
export default NoteDetails;
