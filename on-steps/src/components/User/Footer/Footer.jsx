import React from 'react'
import "./Footer.css"
import Logo from "../../../assets/Logo.png"
import instagram from "../../../assets/instagram.png"
import facebook from "../../../assets/facebook.png"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='footer'>
        <p>Our page has come to an end, but our relationship with you has not.</p>
        <div className="footer-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          
            <img src={Logo} alt="footer-logo" />
            <p>ON-STEPS</p>
        </div>
        
        <div className="footer-social-icons">
            <p>CONTACT US-</p>
            <p>WhatsApp:+91 90599-38941</p>
            <div className="footer-icons-container">
    <img src={instagram} alt="instagram-logo" />
    <img src={facebook} alt="facebook-logo" />
</div>

        </div>
            <div className="footer-copyright">
                <hr />
                <p>copyright @ 2025 - All Right Reserved</p></div>     
    </div>
  )
}
