import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";
import Hero from "./component/Hero/Hero";
import About from "./component/About/About";
import Skills from "./component/Skills/Skills";
import Projects from "./component/Projects/Project";
import Certifications from "./component/Certifications/Certifications";
import Contact from "./component/Contact/Contact";
import Footer from "./component/Footer/Footer";

import AdminUpload from "./component/AdminUpload";
import AdminLogin from "./component/AdminLogin";

import "./App.css";

// ---------------------------
// HOME COMPONENT
// ---------------------------
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
};

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("admin-auth") === "true"
  );

  return (
    <>
      <Routes>
        {/* MAIN WEBSITE ROUTE */}
        <Route path="/" element={<Home />} />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminUpload />
            ) : (
              <AdminLogin onLogin={() => setAuthenticated(true)} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
