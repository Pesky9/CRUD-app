import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import Add from "../assets/add.png";
import Delete from "../assets/delete.svg";
import Update from "../assets/update.svg";
import axios from "axios";
import { BaseURL } from "../BaseURL";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/getnote`);
        setNotes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, [update]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseURL}/getnote`);
      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      if (title === "" && description === "") {
        alert("Fields can't be empty");
      } else {
        const response = await axios.post(`${BaseURL}/updatenote`, {
          Id: id,
          Title: title,
          Description: description,
        });
        console.log("Note added:", response.data);
        setUpdate(false);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const DeleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to proceed with deleting this note?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(`${BaseURL}/deletenote`, {
          data: { Id: id },
        });
        console.log(response);
        fetchData();
      } catch (error) {
        console.error(error);
        alert("Failed to delete the note.");
      }
    } else {
      console.log("Delete operation canceled.");
    }
  };

  return (
    <div>
      <header>
        <div className="Header_Section">
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            Tournamax Assignment
          </h1>
          <button
            onClick={() => {
              navigate("/addNote");
            }}
          >
            Add Note
            <img src={Add} alt="Add" />
          </button>
        </div>
      </header>
      <div className="Main_Section">
        {notes.map((note, index) => (
          <div key={index} className="Note_Box">
            <div className="Note_Title">
              <div className="Title_Head">
                <h2>{note.title}</h2>
              </div>
              <div className="Buttons">
                <img
                  src={Delete}
                  alt="Delete"
                  onClick={() => {
                    DeleteNote(note._id);
                  }}
                />
                <img
                  src={Update}
                  alt="Update"
                  onClick={() => {
                    setId(note._id);
                    setTitle(note.title);
                    setDescription(note.description);
                    setUpdate(true);
                  }}
                />
              </div>
            </div>
            <div className="Note_Description">
              <p>{note.description}</p>
            </div>
          </div>
        ))}
      </div>
      {update && (
        <>
          <div className="Overlay">
            <div className="Update_Section">
              <div className="Note_Inputs">
                <input
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Note Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="Note_Add">
                <button onClick={handleClick}>Update Note</button>
                <button
                  onClick={() => {
                    setUpdate(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
