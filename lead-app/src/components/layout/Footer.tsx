import { PROJECT_CONFIG } from '../../config/project'

const Footer = () => (
  <footer>
    <nav>
      <a href="#highlights">Highlights</a>
      <a href="#amenities">Amenities</a>
      <a href="#location">Location</a>
      <a href="#contact">Contact</a>
    </nav>
    <span>
      &copy; <span id="footer-year">{new Date().getFullYear()}</span>
      {PROJECT_CONFIG.companyName}. All rights reserved.
    </span>
  </footer>
)

export default Footer

