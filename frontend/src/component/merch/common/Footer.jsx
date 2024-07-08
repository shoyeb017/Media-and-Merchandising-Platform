import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="newsletter">
        <h2>NEWSLETTER</h2>
        <p>GET HOOKED! SIGN UP TO GET THE LATEST CATCH SENT TO YOUR INBOX.</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your email address" />
          <button>&gt;</button>
        </div>
      </div>
      <div className="contact-section">
      <div className="contact-info">
          <h4>Sifat Bin Asad</h4>
          <p>202214061</p>
          <p>sifatbinasad@gmail.com</p>
          <button>ABOUT ME</button>
        </div>
        <div className="contact-info">
          <h4>Mozahidul Haque Shoyeb</h4>
          <p>202214071</p>
          <p>shoyebhaque017@gmail.com</p>
          <button>ABOUT ME</button>
        </div>
        <div className="contact-info">
          <h4>Shayla Mostafiz Samara</h4>
          <p>202214099</p>
          <p>shaylamustafizsamara@gmail.com</p>
          <button>ABOUT ME</button>
        </div>
        <div className="contact-info">
          <h4>Umme Anjuman Sadia</h4>
          <p>202214111</p>
          <p>ummeanjumansadia@gmail.com</p>
          <button>ABOUT ME</button>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-media">
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
          <FaTwitter className="icon" />
        </div>
        <p>&copy; Copyright 2024, MMP | FAQs | Policies | Careers | Press</p>
        <p>Website by Group 4</p>
      </div>
    </div>
  );
};

export default Footer;
