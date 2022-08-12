import { useState } from "react";
import { useHistory } from "react-router-dom";
import NotesService from "../services/NotesService";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("programming");
  const history = useHistory();
  const saveNote = (e) => {
    e.preventDefault();
    const note = { title, body, category };

    NotesService.create(note)
      .then((response) => {
        console.log("Note Added Successfully", response.data);
        history.push("/");
      })
      .catch((error) => {
        console.log("Something went wrong", console.error());
      });
  };
  return (
    <div className="create">
      <form>
        <div className="form-group">
          <label htmlFor="title">
            Note Title: <sup>*</sup>
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">
            Note Description: <sup>*</sup>
          </label>
          <textarea
            id="body"
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">
            Note Category: <sup>*</sup>
          </label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="programming">Programming</option>
            <option value="vacation">Vacation</option>
            <option value="meeting">Meeting</option>
            <option value="blogging">Blogging</option>
          </select>
        </div>
        <div className="text-center">
          <button onClick={(e) => saveNote(e)}>Add Note</button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;