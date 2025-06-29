import React, { useState, useEffect } from "react";
import axios from "axios";

const initialFormState = {
  firstname: "",
  lastname: "",
  position: "",
  jerseyNumber: "",
  dateOfBirth: "",
  nationality: "",
  height: "",
  weight: "",
  email: "",
  phone: "",
};

const updatePlayer = ({ playerToEdit, onSubmitSuccess }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerToEdit) {
      setFormData(playerToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [playerToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (playerToEdit) {
        await axios.put(`http://localhost:8000/api/updatePlayer/${playerToEdit.id}`, formData);
        alert("Player updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/createPlayer", formData);
        alert("Player added successfully!");
      }

      setFormData(initialFormState);
      onSubmitSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <h2><button>{playerToEdit ? "Edit Player" : "Add New Player"}</button></h2>
      
      <div className="form-group">
        <label>First Name</label>
        <input name="firstname" value={formData.firstname} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input name="lastname" value={formData.lastname} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Position</label>
        <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="">Select Position</option>
          <option value="forward">Forward</option>
          <option value="midfielder">Midfielder</option>
          <option value="defender">Defender</option>
          <option value="goalkeeper">Goalkeeper</option>
        </select>
      </div>

      <div className="form-group">
        <label>Jersey Number</label>
        <input type="number" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} min="1" max="99" />
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => onSubmitSuccess()} className="btn secondary">
          Cancel
        </button>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Saving..." : playerToEdit ? "Update Player" : "Add Player"}
        </button>
      </div>
    </form>
  );
};

export default updatePlayer;
