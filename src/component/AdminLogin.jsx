import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // simple password check
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      onLogin();
    } else {
      setMsg("Incorrect password!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <label style={styles.label}>Enter Admin Password</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Login
        </button>
      </form>

      <p style={{ textAlign: "center" }}>{msg}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "400px",
    margin: "50px auto",
    background: "#1b1b1b",
    borderRadius: "10px",
    color: "#fff",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  label: { fontWeight: 600 },
  input: {
    padding: "10px",
    background: "#222",
    color: "#fff",
    borderRadius: "6px",
    border: "1px solid #444",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
  },
};

export default AdminLogin;
