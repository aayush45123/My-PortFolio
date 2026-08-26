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
      <div className={styles.contactContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelNumber}>05</span>
            Contact
          </div>
          <h2 className={styles.sectionTitle}>Let's build something together</h2>
          <p className={styles.sectionDescription}>
            Feel free to reach out for collaborations, questions, or opportunities.
          </p>
        </div>

        <div className={styles.contactWrapper}>
          {/* Left - Info */}
          <div className={styles.contactInfo}>
            <h3 className={styles.infoTitle}>Contact Details</h3>

            <div className={styles.infoList}>
              <a href="mailto:aayushbharda999@gmail.com" className={styles.infoItem}>
                <Mail className={styles.icon} size={18} />
                <span>aayushbharda999@gmail.com</span>
              </a>

              <a href="tel:+919167541096" className={styles.infoItem}>
                <Phone className={styles.icon} size={18} />
                <span>+91 91675 41096</span>
              </a>

              <div className={styles.infoItem}>
                <MapPin className={styles.icon} size={18} />
                <span>Mumbai, India</span>
              </div>
            </div>

            <div className={styles.socialWrapper}>
              <span className={styles.socialLabel}>Socials</span>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.linkedin.com/in/aayush-bharda-399958311/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://github.com/aayush45123"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
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
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="How can I help you?"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
