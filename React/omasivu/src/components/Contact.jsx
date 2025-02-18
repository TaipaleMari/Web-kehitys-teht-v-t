import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact">
      <h1>Ota yhteyttä</h1>
      <div className="contact-container">
        <div className="contact-card">
          <img src="hirvi.jpg" alt="John Deer" />
          <h2>John Deer</h2>
          <p>Email: john.doe@example.com</p>
        </div>
        <div className="contact-card">
          <img src="karhu.jpg" alt="Jane Bear" />
          <h2>Jane Bear</h2>
          <p>Email: jane.smith@example.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;