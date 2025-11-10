import React, { useRef } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4z7vq1k",
        "template_z63bv9e",
        form.current,
        "dMmdnfSz3OMoU2IV3"
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("❌ Failed to send message. Try again later.");
          console.error(error);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="contact-form">
      
      <input type="text" name="from_name" placeholder="Name" required />      
      <input type="email" name="reply_to" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
