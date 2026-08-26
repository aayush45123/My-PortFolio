import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    if (password === adminPass) {
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

      {msg && <p style={{ textAlign: "center", color: "#ff4d4f", marginTop: "12px", fontSize: "14px" }}>{msg}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "400px",
    margin: "120px auto 40px",
    background: "var(--card-bg, #111)",
    borderRadius: "8px",
    border: "1px solid var(--border-color, #222)",
    color: "var(--text-primary, #fff)",
  },
  heading: { textAlign: "center", marginBottom: "20px", fontFamily: "var(--font-heading)" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  label: { fontSize: "12px", fontWeight: "600", color: "var(--text-tertiary, #888)", fontFamily: "var(--font-mono)", textTransform: "uppercase" },
  input: {
    padding: "12px",
    background: "var(--bg-primary, #0a0a0a)",
    color: "var(--text-primary, #fff)",
    borderRadius: "4px",
    border: "1px solid var(--border-color, #333)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px",
    background: "var(--accent, #6C63FF)",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
    fontWeight: "600",
    fontFamily: "var(--font-body)",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "6px",
  },
};

export default AdminLogin;
