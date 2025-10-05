import React, { useState, useRef } from "react";
import axios from "axios";
import "./ImageUpload.css";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [errors, setErrors] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    image: "",
  });

  // Username validation
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value && value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 3 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  // Phone number validation - only numbers
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);

      // Validate phone number length (adjust as needed for your requirements)
      if (value && value.length !== 11) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Phone number must be 11 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }
    }
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setImage(file);
    }
  }

  const isFormValid = () => {
    return (
      username &&
      phoneNumber &&
      email &&
      image &&
      !errors.username &&
      !errors.phoneNumber &&
      !errors.email &&
      !errors.image &&
      phoneNumber.length === 11 &&
      validateEmail(email)
    );
  };

  async function handleUploadApi() {
    if (!username || !phoneNumber || !email || !image) {
      alert("Please fill all fields");
      return;
    }
    if (!isFormValid()) {
      const firstError =
        errors.username ||
        errors.phoneNumber ||
        errors.email ||
        errors.image ||
        "Please fill all required fields";
      alert(
        `Please fix all validation errors before submitting.Here are the errors: \n\n${firstError}`
      );

      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    // formData.append("password", password);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("phoneNumber", phoneNumber);
    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Successful:", res.data);
      setData(`http://localhost:3000${res.data.image}`);

      // Set user details for display
      setUserDetails({
        username,
        phoneNumber,
        email,
        image,
        registrationDate: new Date().toLocaleDateString(),
      });
      resetForm();
      alert("User registered successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      alert(
        `Error uploading user data: ${err.response?.data?.error || err.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setUsername("");
    //setPassword("");
    setPhoneNumber("");
    setEmail("");
    setImage(null);
    setFileInputKey(Date.now());
    setErrors({
      username: "",
      phoneNumber: "",
      email: "",
      image: "",
    });
  }

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">User Registration With Profile Image</h2>

        <div className="form-group">
          <label className="form-label">Username </label>
          <input
            className={`form-input ${errors.username ? "error" : ""}`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            className={`form-input ${errors.phoneNumber ? "error" : ""}`}
            type="text"
            placeholder="Phone Number(11 digits)"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength={11}
          />{" "}
          {errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className={`form-input ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />{" "}
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Profile Image</label>
          <div className="file-input-wrapper">
            <input
              key={fileInputKey}
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleImage}
              className="file-input"
              accept="image/*"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-custom">
              <span className="file-custom-text">
                {image ? image.name : "Choose a file..."}
              </span>
              <span className="file-custom-button">Browse</span>
            </label>
          </div>
          {errors.image && (
            <span className="error-message">{errors.image}</span>
          )}
        </div>

        <button
          className="submit-button"
          onClick={handleUploadApi}
          // disabled={!isFormValid() || loading}
          // disabled={!username || !password || !email || !image}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>

        {/* Display User Details after successful registration */}
        {userDetails && (
          <div className="user-details-section">
            <h3 className="details-title">Registration Successful!</h3>
            <div className="details-card">
              <div className="details-row">
                <span className="details-label">Username:</span>
                <span className="details-value">{userDetails.username}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Phone Number:</span>
                <span className="details-value">{userDetails.phoneNumber}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Email:</span>
                <span className="details-value">{userDetails.email}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Registration Date:</span>
                <span className="details-value">
                  {userDetails.registrationDate}
                </span>
              </div>
              <div className="details-row">
                <span className="details-label">Profile Image:</span>
                <div className="image-preview">
                  <img
                    src={
                      userDetails.image
                        ? URL.createObjectURL(userDetails.image)
                        : ""
                    }
                    alt="Profile"
                    className="user-image"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image in a square box */}
        {/* {data && (
          <div className="preview-section">
            <p>Uploaded Image:</p>
            <img src={data} alt="uploaded" className="preview-image" />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ImageUpload;
