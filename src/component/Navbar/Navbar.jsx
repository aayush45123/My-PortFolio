import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Smooth scroll handler (ADDED)
  const handleNavClick = (e, path) => {
    e.preventDefault(); // prevent route change

    const id = path.replace("/", ""); // "/about" → "about"
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
    { name: "Certifications", path: "/certifications" },
  ];

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbarContainer}>
        {/* Brand/Logo */}
        <div className={styles.navbarBrand}>
          <Link to="/" className={styles.logo}>
            Aayush
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.navMenu}>
          {navItems.map((item) => (
            <li key={item.name} className={styles.navItem}>
              <Link
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)} // ADDED
                className={`${styles.navLink} ${
                  isActive(item.path) ? styles.active : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.navbarActions}>
          {/* Theme Toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className={styles.icon} size={20} />
            ) : (
              <Moon className={styles.icon} size={20} />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={styles.icon} size={24} />
            ) : (
              <Menu className={styles.icon} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ""}`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={(e) => handleNavClick(e, item.path)} // ADDED
            className={`${styles.mobileLink} ${
              isActive(item.path) ? styles.active : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
