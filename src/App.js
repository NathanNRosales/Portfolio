import React, { useEffect, useState } from "react";
import logo from "./initial_Logo.jpg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const username = process.env.REACT_APP_GITHUB_USERNAME;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    // Fetch GitHub contribution data
    const fetchData = async () => {
      const query = `
        query($userName:String!) {
          user(login:$userName) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: { userName: username },
          }),
        });

        const json = await res.json();
        setData(json.data.user.contributionsCollection.contributionCalendar);
      } catch (err) {
        console.error("GitHub API error:", err);
      }
    };

    fetchData();

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = contactForm.querySelector("#name").value;
        const email = contactForm.querySelector("#email").value;
        const message = contactForm.querySelector("#message").value;

        if (name && email && message) {
          alert("Thank you for your message! I will get back to you soon.");
          contactForm.reset();
        } else {
          alert("Please fill out all fields.");
        }
      });
    }

    // Cleanup
    return () => {
      navLinks.forEach((link) =>
        link.removeEventListener("click", () => {})
      );
      if (contactForm)
        contactForm.removeEventListener("submit", () => {});
    };
  }, [username, token]);

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} className="App-logo" alt="logo" />
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div>
          <h1>Welcome to My Portfolio</h1>
          <p>Showcasing my skills, projects, and passion for development.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about">
        <h2>Objective</h2>
        <p>
          My goal is to create impactful, user-focused solutions through
          innovative web development. With a strong foundation in modern
          technologies, I aim to deliver high-quality projects that solve
          real-world problems.
        </p>
        <p>
          From AI Recipe Generator, to an easy-to-use to-do application (ready
          for download).
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects">
        <h2>My Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>A dynamic web application built with React.</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>A full-stack app with a modern UI.</p>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Another exciting project showcasing my skills.</p>
          </div>
        </div>

        {/* 💚 GitHub Contribution Calendar */}
        <div className="github-section">
  <h3>My GitHub Activity</h3>
  
  {!data ? (
    <p>Loading contributions...</p>
  ) : (
    <div>
      <p>Total Contributions: {data.totalContributions}</p>

      {/* Contribution Grid */}
      <div className="relative">
        <div className="grid-container">
          {data.weeks.map((week, wi) => (
            <div key={wi} className="week-column">
              {week.contributionDays.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  className="day-square"
                  style={{ backgroundColor: day.color }}
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Month Labels */}
        <div className="month-labels">
          {data.weeks.map((week, wi) => {
            const firstDay = week.contributionDays[0].date;
            const month = new Date(firstDay).toLocaleString("default", {
              month: "short",
            });

            // Only show month label if it's the first occurrence
            const prevWeek = data.weeks[wi - 1];
            const prevMonth = prevWeek
              ? new Date(prevWeek.contributionDays[0].date).toLocaleString(
                  "default",
                  { month: "short" }
                )
              : null;

            return month !== prevMonth ? (
              <span key={wi} className="month-label">
                {month}
              </span>
            ) : (
              <span key={wi} className="month-label"></span>
            );
          })}
        </div>
      </div>
    </div>
  )}
</div>

      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2>Contact Me</h2>
        <form id="contact-form" className="contact-form">
          <input type="text" id="name" placeholder="Your Name" required />
          <input type="email" id="email" placeholder="Your Email" required />
          <textarea
            id="message"
            placeholder="Your Message"
            rows="4"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default App;
