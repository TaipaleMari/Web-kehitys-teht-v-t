import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <section id="services">
      <h1>Palvelut</h1>
      <div className="service-item">
        <img src="fox.png" alt="Service 1" />
        <h3>Service 1</h3>
      </div>
      <div className="service-item">
        <img src="squirrel.png" alt="Service 2" />
        <h3>Service 2</h3>
      </div>
      <div className="service-item">
        <img src="rabbit.png" alt="Service 3" />
        <h3>Service 3</h3>
      </div>
    </section>
  );
};

export default Services;