import logo from './initial_Logo.jpg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const message = contactForm.querySelector('#message').value;

        if (name && email && message) {
          alert('Thank you for your message! I will get back to you soon.');
          contactForm.reset();
        } else {
          alert('Please fill out all fields.');
        }
      });
    }

    // Cleanup event listeners on component unmount
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      if (contactForm) {
        contactForm.removeEventListener('submit', () => {});
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="navbar">
        <img src={logo} className="App-logo" alt="logo" />
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <div>
          <h1>Welcome to My Portfolio</h1>
          <p>Showcasing my skills, projects, and passion for development.</p>
        </div>
      </section>

      <section id="about" className="section about">
        <h2>Objective</h2>
        <p>
          My goal is to create impactful, user-focused solutions through innovative
          web development. With a strong foundation in modern technologies, I aim
          to deliver high-quality projects that solve real-world problems.
        </p>
      </section>

      <section id="projects" className="section projects">
        <h2>My Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Where does this go: A dynamic web application built with React.</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Middle goes here: A full-stack app with a modern UI.</p>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Another exciting project showcasing my skills.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact Me</h2>
        <form id="contact-form" className="contact-form">
          <input type="text" id="name" placeholder="Your Name" required />
          <input type="email" id="email" placeholder="Your Email" required />
          <textarea id="message" placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default App;