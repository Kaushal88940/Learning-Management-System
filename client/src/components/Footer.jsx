import React from 'react';
import './Footer.css'; // Import the custom CSS

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="/" className="d-flex align-items-center mb-3" aria-label="Logo">
              <svg className="bi me-2" width="40" height="32" aria-hidden="true">
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>
            <p>© 2025</p>
          </div>

          <div className="col">
            <h5>Section</h5>
            <ul className="nav">
              <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
              <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
              <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            </ul>
          </div>

          <div className="col">
            <h5>Section</h5>
            <ul className="nav">
              <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
              <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
              <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            </ul>
          </div>

          <div className="col">
            <h5>Section</h5>
            <ul className="nav">
              <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
              <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
              <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
