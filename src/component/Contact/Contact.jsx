import React, { useRef } from "react";
import styles from "./Contact.module.css";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_f25td8x",
        "template_9xlo1ic",
        formRef.current,
        "st4MEeSrJ52J6kh6R"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.log(error);
          alert("Failed to send message. Try again!");
        }
      );
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactWrapper}>
        {/* Left - Info */}
        <div className={styles.contactInfo}>
          <h3 className={styles.infoTitle}>Let's Connect</h3>

          <div className={styles.infoItem}>
            <Mail className={styles.icon} />
            <p>aayushbharda999@gmail.com</p>
          </div>

          <div className={styles.infoItem}>
            <Phone className={styles.icon} />
            <p>+91 91675 41096</p>
          </div>

          <div className={styles.infoItem}>
            <MapPin className={styles.icon} />
            <p>Mumbai, India</p>
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/in/aayush-bharda-399958311/"
              target="_blank"
            >
              <Linkedin />
            </a>
            <a href="https://github.com/aayush45123" target="_blank">
              <Github />
            </a>
          </div>
        </div>

        {/* Right - Form */}
        <form className={styles.contactForm} ref={formRef} onSubmit={sendEmail}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input name="name" type="text" placeholder="Your Name" required />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
