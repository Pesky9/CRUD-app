import React, { useState } from "react";
import "./AddNotepage.css";
import Add from "../assets/add.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../BaseURL";

const AddNotepage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (title === "" && description === "") {
        alert("Fields can't be empty");
      } else {
        const response = await axios.post(`${BaseURL}/addnote`, {
          Title: title,
          Description: description,
        });
        navigate("/");
        console.log("Note added:", response.data);
      }
    } catch (error) {
      console.error("Error adding note:", error);
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
      <div className="Add_Section">
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
          <button onClick={handleClick}>Add Note</button>
        </div>
      </div>
    </div>
  );
};

export default AddNotepage;
