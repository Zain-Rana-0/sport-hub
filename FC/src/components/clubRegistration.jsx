import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Allcss/clubRegister.css";

export default function ClubRegister() {
  const [formData, setFormData] = useState({
    club_name: "",
    club_logo: null,
    club_type: "Sports",
    club_description: "",
    founded_date: "",
    club_email: "",
    country: "",
    city: "",
    club_contact: "",
    president_name: "",
    president_email: "",
    membership_requirements: "",
    membership_fee: "",
    terms: false,
  });

  // Add preview state
  const [logoPreview, setLogoPreview] = useState(null);
  const navigate = useNavigate();
  const userInLocalStorage = localStorage.getItem("user");

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        // Create preview URL for image
        const preview = URL.createObjectURL(file);
        setLogoPreview(preview);
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (key === "club_logo" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:8000/api/clubs/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Club registered successfully!");
        navigate("/");

        // Reset form and logo preview
        setLogoPreview(null);
        setFormData({
          club_name: "",
          club_logo: null,
          club_type: "Sports",
          club_description: "",
          founded_date: "",
          club_email: "",
          country: "",
          city: "",
          club_contact: "",
          president_name: "",
          president_email: "",
          membership_requirements: "",
          membership_fee: "",
          terms: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error.response?.data?.message ||
          "Failed to register club. Please try again."
      );
    }
  };

  

  return (
    <div className="home-container">
      <div className="form-container">
        <h2 className="form-title">Club Registration Form</h2>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Basic Club Information */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Club Name *</label>
              <input
                type="text"
                name="club_name"
                required
                value={formData.club_name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Club Type</label>
              <select
                name="club_type"
                value={formData.club_type}
                onChange={handleInputChange}
                className="form-select"
              >
                <option>Sports</option>
                <option>Academic</option>
                <option>Social</option>
                <option>Cultural</option>
                <option>Others</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Club Description</label>
              <textarea
                name="club_description"
                rows={4}
                value={formData.club_description}
                onChange={handleInputChange}
                className="form-textarea"
              ></textarea>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-grid">
            <div className="form-group">
              <label className="form-label">Founded Date</label>
              <input
                type="date"
                name="founded_date"
                value={formData.founded_date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Club Email *</label>
              <input
                type="email"
                name="club_email"
                required
                value={formData.club_email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="location-grid">
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Club Contact Number</label>
              <input
                type="tel"
                name="club_contact"
                value={formData.club_contact}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Representative Section */}
          <div className="representative-section">
            <h3 className="section-title">Club President/Representative</h3>
            <div className="president-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="president_name"
                  required
                  value={formData.president_name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="president_email"
                  required
                  value={formData.president_email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="terms-section">
            <div className="terms-checkbox">
              <input
                type="checkbox"
                name="terms"
                required
                checked={formData.terms}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <label className="checkbox-label">
                I agree to the{" "}
                <a href="/terms" className="terms-link">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button type="submit" className="submit-button">
              Register Club
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}