import { useState, useEffect } from "react";

function Note() {
  const [note, setNote] = useState("");
  const [addNote, setAddNote] = useState([]);

  // ✅ Load notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setAddNote(savedNotes);
  }, []);

  // ✅ Save notes to localStorage whenever addNote changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(addNote));
  }, [addNote]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleAddNote = () => {
    if (note.trim() === "") return alert("Please enter a note!");
    const newNotes = [...addNote, note];
    setAddNote(newNotes);
    setNote(""); // clear input
  };

  const handleDelete = (index) => {
    const updatedNotes = addNote.filter((_, i) => i !== index);
    setAddNote(updatedNotes);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-4">📝 Notes App</h2>

      {/* Input + Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={note}
          onChange={handleChange}
          placeholder="Write a note..."
          className="border border-gray-600 p-2 rounded-lg flex-1 bg-gray-800 text-white
                     hover:border-blue-500 focus:border-blue-500 focus:ring-2 ring-blue-400 outline-none"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          +
        </button>
      </div>

      {/* Notes List */}
      {addNote.length > 0 ? (
        <ul className="space-y-2">
          {addNote.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 p-2 rounded-lg max-w-screen"
            >
              <span>{item}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-400 hover:text-red-500 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No notes added yet.</p>
      )}
    </div>
  );
}

export default Note;
