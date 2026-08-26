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
          <span className={styles.sectionIndex}>[ 05 ]</span>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
        </div>

        <div className={styles.contactWrapper}>
          {/* Left - Info */}
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoHeading}>Inquiries & Opportunities</h3>
              <p className={styles.infoSubtext}>
                Open to full-time engineering roles, high-impact freelance builds, and technical consultations.
              </p>
            </div>

            <div className={styles.infoList}>
              <a href="mailto:aayushbharda999@gmail.com" className={styles.infoItem}>
                <span className={styles.infoLabel}>EMAIL</span>
                <span className={styles.infoValue}>aayushbharda999@gmail.com</span>
              </a>

              <a href="tel:+919167541096" className={styles.infoItem}>
                <span className={styles.infoLabel}>PHONE</span>
                <span className={styles.infoValue}>+91 91675 41096</span>
              </a>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>LOCATION</span>
                <span className={styles.infoValue}>Mumbai, India</span>
              </div>
            </div>

            <div className={styles.socialWrapper}>
              <span className={styles.socialLabel}>Profiles</span>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.linkedin.com/in/aayush-bharda-399958311/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/aayush45123"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form className={styles.contactForm} ref={formRef} onSubmit={sendEmail}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                name="message"
                placeholder="Describe your project, timeline, or query..."
                className={styles.textarea}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <span>Send Message</span>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
