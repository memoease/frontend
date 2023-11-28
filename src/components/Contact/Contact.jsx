import React, { useState } from "react";
import "../../css/contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier könntest du die Daten an einen Server senden oder andere Aktionen ausführen
    console.log("Form submitted:", formData);
  };

  const sendEmail = () => {
    window.location.href = "mailto:memoease.team@gmail.com";
  };

  return (
    <div className="contactForm">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default Contact;
