import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotesService from "../services/NotesService";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("programming");
  const [errors, setErrors] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const saveNote = (e) => {
    e.preventDefault();
    if (!title || !body) {
      setErrors(true);
      return;
    }

    if (id) {
      const note = { title, body, category, id };
      NotesService.update(note)
        .then((response) => {
          console.log("Note Updated Successfully.", response.data);
          history.push("/");
        })
        .catch((error) => {
          console.log("something went wrong.", error);
        });
    } else {
      const note = { title, body, category };
      NotesService.create(note)
        .then((response) => {
          console.log("Note Added Successfully", response.data);
          history.push("/");
        })
        .catch((error) => {
          console.log("Something went wrong", console.error());
        });
    }
  };

  useEffect(() => {
    if (id) {
      NotesService.get(id)
        .then((note) => {
          setTitle(note.data.title);
          setBody(note.data.body);
          setCategory(note.data.category);
        })
        .catch((error) => {
          console.log("something went wrong...", error);
        });
    }
  }, []);
  return (
    <div className="create">
      <div className="text-center">
        <h5>{id ? "Update a Note" : "Add a New Note"}</h5>
        {errors && (
          <span style={{ color: "red", fontStyle: "italic" }}>
            please enter mondatory fields
          </span>
        )}
      </div>
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
          <button onClick={(e) => saveNote(e)}>
            {id ? "Update Note" : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
