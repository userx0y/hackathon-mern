import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // to track editing

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currNote.trim() === "") return;

    if (editIndex !== null) {
      // update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = currNote;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // add new note
      setNotes([...notes, currNote]);
    }

    setCurrNote("");
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setCurrNote(notes[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <>
      <div className="container-fluid pt-5">
        <h1 className="ps-5" data-aos="fade-in" style={{ fontFamily: "'Montserrat'", fontSize: '70px' }}>Notes</h1>

        {/* Add button (hidden when form open) */}
        {!showForm && (
          <button className="btn btn-success ms-5 mt-3" onClick={() => { setCurrNote(""); setShowForm(true); }}>Add note</button>
        )}

        {/* Form for add/edit */}
        {showForm && (
          <form onSubmit={handleSubmit} className="ms-5 mt-3 d-flex gap-2">
            <input type="text" value={currNote} onChange={(e) => setCurrNote(e.target.value)} className="form-control" placeholder="Write your note..." />
            <button type="submit" className="btn btn-primary">{editIndex !== null ? "Update" : "Save"}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setCurrNote(""); setEditIndex(null); }}>Cancel</button>
          </form>
        )}

        {/* Notes list with edit button */}
        <ol className="ms-5 mt-4">
          {notes.map((note, index) => (
            <li key={index} className="d-flex align-items-center gap-2">
              {note}
              <button className="btn btn-sm btn-warning" onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Notes;
