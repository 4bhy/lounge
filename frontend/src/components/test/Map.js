import React from 'react'
import './Map.css'
const Map = () => {
    const lat = 50.5418
    const lng = 6.5625
    const mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${lat},${lng}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    return (
        <div className="map-container px-16 mt-8 overflow-hidden">
        <iframe
          title="map"
          className="map"
          src={mapUrl}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        >
          <a href="https://www.maps.ie/distance-area-calculator.html">distance maps</a>
        </iframe>
      </div>
  
    );
};


export default Map
