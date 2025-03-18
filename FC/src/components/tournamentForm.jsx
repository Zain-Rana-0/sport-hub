import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./tournamentform.css";

export default function TournamentForm({ onSubmitSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    club_name: "",
    club_logo: "",
    tournament_type: "",
    tournament_description: "",
    starting_date: "",
    ending_date: "",
    president_name: "",
    president_email: "",
  });

  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    if (formData.club_logo && formData.club_logo.startsWith("http")) {
      setLogoPreview(formData.club_logo);
    } else {
      setLogoPreview(null);
    }
  }, [formData.club_logo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.club_name.trim()) {
      newErrors.club_name = "Club name is required";
    }

    if (!formData.tournament_type.trim()) {
      newErrors.tournament_type = "Tournament type is required";
    }

    if (!formData.president_name.trim()) {
      newErrors.president_name = "President name is required";
    }

    if (!formData.president_email.trim()) {
      newErrors.president_email = "President email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.president_email)) {
      newErrors.president_email = "Please enter a valid email address";
    }

    if (formData.starting_date && formData.ending_date) {
      const startDate = new Date(formData.starting_date);
      const endDate = new Date(formData.ending_date);

      if (endDate < startDate) {
        newErrors.ending_date = "End date cannot be before start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/tournament",
        formData
      );

      alert("Tournament created successfully!");
      onSubmitSuccess();
    } catch (error) {
      console.error("Error creating tournament:", error);
      alert(error.response?.data?.message || "Failed to create tournament");
    }
  };

  return (
    <div className="tournament-form-container">
      <h2 className="tournament-form-title">Create New Tournament</h2>
      <p className="tournament-form-subtitle">
        Fill in the details below to set up your tournament
      </p>

      <form onSubmit={handleSubmit}>
        Club Information Section
        <div className="form-section">
          <h3 className="form-section-title">Club Information</h3>

          <div className="form-group">
            <label htmlFor="club_name">Club Name *</label>
            <input
              id="club_name"
              type="text"
              name="club_name"
              placeholder="Enter your club name"
              value={formData.club_name}
              onChange={handleChange}
              className={errors.club_name ? "error" : ""}
            />
            {errors.club_name && (
              <div className="error-message">{errors.club_name}</div>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="club_logo">Club Logo URL</label>
            <div className="logo-preview">
              {logoPreview ? (
                <img src={logoPreview} alt="Club logo preview" />
              ) : (
                <span className="logo-placeholder">
                  Logo preview will appear here
                </span>
              )}
            </div>
            <input
              id="club_logo"
              type="text"
              name="club_logo"
              placeholder="Enter URL for your club logo"
              value={formData.club_logo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tournament Details Section */}
        <div className="form-section">
          <h3 className="form-section-title">Tournament Details</h3>

          <div className="form-group">
            <label htmlFor="tournament_type">Tournament Type *</label>
            <input
              id="tournament_type"
              type="text"
              name="tournament_type"
              placeholder="e.g., League, Knockout, Round Robin"
              value={formData.tournament_type}
              onChange={handleChange}
              className={errors.tournament_type ? "error" : ""}
            />
            {errors.tournament_type && (
              <div className="error-message">{errors.tournament_type}</div>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="tournament_description">
              Tournament Description
            </label>
            <textarea
              id="tournament_description"
              name="tournament_description"
              placeholder="Provide details about your tournament..."
              value={formData.tournament_description}
              onChange={handleChange}
            />
          </div>

          <div className="date-range-container full-width">
            <div className="form-group">
              <label htmlFor="starting_date">Starting Date</label>
              <input
                id="starting_date"
                type="date"
                name="starting_date"
                value={formData.starting_date}
                onChange={handleChange}
              />
            </div>

            <span className="date-separator">to</span>

            <div className="form-group">
              <label htmlFor="ending_date">Ending Date</label>
              <input
                id="ending_date"
                type="date"
                name="ending_date"
                value={formData.ending_date}
                onChange={handleChange}
                className={errors.ending_date ? "error" : ""}
              />
              {errors.ending_date && (
                <div className="error-message">{errors.ending_date}</div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h3 className="form-section-title">Contact Information</h3>

          <div className="form-group">
            <label htmlFor="president_name">President Name *</label>
            <input
              id="president_name"
              type="text"
              name="president_name"
              placeholder="Enter president's name"
              value={formData.president_name}
              onChange={handleChange}
              className={errors.president_name ? "error" : ""}
            />
            {errors.president_name && (
              <div className="error-message">{errors.president_name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="president_email">President Email *</label>
            <input
              id="president_email"
              type="email"
              name="president_email"
              placeholder="Enter president's email"
              value={formData.president_email}
              onChange={handleChange}
              className={errors.president_email ? "error" : ""}
            />
            {errors.president_email && (
              <div className="error-message">{errors.president_email}</div>
            )}
          </div>
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit">Create Tournament</button>
        </div>
      </form>
    </div>
  );
}
