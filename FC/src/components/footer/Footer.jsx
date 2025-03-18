import "./Footer.css";
export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-section logo">
            <h2>Your Sports Website</h2>
            <p>&copy; 2024 All Rights Reserved</p>
          </div>
          <div className="footer_section links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Live Scores</a>
              </li>
              <li>
                <a href="#">Fixtures</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h4>Contact Us</h4>
            <p>Email: zainulabideen2747@gmail.com</p>
            <p>Phone: +92 325 1575 822</p>
          </div>
          <div className="footer-section social">
            <h4>Follow Us</h4>
            <a href="/">
              <i className="fab fa-facebook-f">Facebook</i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>Instagaram
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>X(Twiter)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
