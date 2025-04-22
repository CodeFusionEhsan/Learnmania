// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Developed by <strong>Ehsan Saleem </strong>
          <a 
            href="https://github.com/CodeFusionEhsan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:underline">
             @CodeFusionEhsan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;