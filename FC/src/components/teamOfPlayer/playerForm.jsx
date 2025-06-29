import React, { useState } from "react";
import axios from "axios";
// import { div } from "framer-motion/client";

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

const playerForm = ({ onSubmitSuccess, playerToEdit = null }) => {
  const [formData, setFormData] = useState(playerToEdit || initialFormState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.name = "FirstName is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.name = "LastName is required";
    }
    if (!formData.position) {
      newErrors.position = "Position is required";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (
      formData.jerseyNumber &&
      (formData.jerseyNumber < 1 || formData.jerseyNumber > 99)
    ) {
      newErrors.jerseyNumber = "Jersey number must be between 1 and 99";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const endpoint = "http://localhost:8000/api/createPlayer";

      const response = await axios.post(endpoint, formData);

      alert("Player added successfully!");

      setFormData(initialFormState);
      // onSubmitSuccess?.();
    } catch (error) {
      console.error("Error saving player:", error);
      alert(error.response?.data?.message || "Failed to save player");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="player-form-container">
      <button type="button" >
        Create New Player
      </button>
    <form onSubmit={handleSubmit} className="player-form">
      <h2>{playerToEdit ? "Edit Player" : "Add New Player"}</h2>

      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <div className="form-group">
        <label htmlFor="firstname">First Name *</label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastname">Last Name *</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="position">Position *</label>
        <select
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        >
           {["forward", "midfielder", "defender", "goalkeeper"].map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="jerseyNumber">Jersey Number</label>
        <input
          id="jerseyNumber"
          name="jerseyNumber"
          type="number"
          min="1"
          max="99"
          value={formData.jerseyNumber}
          onChange={handleChange}
        />
        {errors.jerseyNumber && (
          <span className="error">{errors.jerseyNumber}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">dateOfBirth</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nationality">Nationality</label>
        <input
          id="nationality"
          name="nationality"
          type="text"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            id="height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onSubmitSuccess}
          className="btn secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading
            ? "Saving..."
            : playerToEdit
            ? "Update Player"
            : "Add Player"}
        </button>
      </div>
    </form>
    </div>
  );
};

export default playerForm;
