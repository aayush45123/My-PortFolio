import React, { useState } from "react";
import api from "../api/axios"; // ✅ USE AXIOS INSTANCE

const AdminUpload = () => {
  const [activeTab, setActiveTab] = useState("certificate");

  // Certificate states
  const [certTitle, setCertTitle] = useState("");
  const [certType, setCertType] = useState("pdf");
  const [certFile, setCertFile] = useState(null);
  const [certThumbnail, setCertThumbnail] = useState(null);
  const [certMessage, setCertMessage] = useState("");

  // Project states
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTechStack, setProjTechStack] = useState("");
  const [projGithub, setProjGithub] = useState("");
  const [projLive, setProjLive] = useState("");
  const [projImage, setProjImage] = useState(null);
  const [projMessage, setProjMessage] = useState("");

  // Upload certificate
  const uploadCertificate = async (e) => {
    e.preventDefault();

    if (!certTitle || !certFile || !certThumbnail) {
      setCertMessage("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", certTitle);
    formData.append("type", certType);
    formData.append("file", certFile);
    formData.append("thumbnail", certThumbnail);

    try {
      await api.post("/api/certificates", formData);

      setCertMessage("Certificate uploaded successfully!");
      setCertTitle("");
      setCertFile(null);
      setCertThumbnail(null);
    } catch (err) {
      console.error(err);
      setCertMessage("Certificate upload failed!");
    }
  };

  // Upload project
  const uploadProject = async (e) => {
    e.preventDefault();

    if (!projTitle || !projImage) {
      setProjMessage("Project title + image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", projTitle);
    formData.append("description", projDesc);
    formData.append("techStack", projTechStack);
    formData.append("githubURL", projGithub);
    formData.append("liveURL", projLive);
    formData.append("image", projImage);

    try {
      await api.post("/api/projects", formData);

      setProjMessage("Project uploaded successfully!");
      setProjTitle("");
      setProjDesc("");
      setProjTechStack("");
      setProjGithub("");
      setProjLive("");
      setProjImage(null);
    } catch (err) {
      console.error(err);
      setProjMessage("Project upload failed!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Panel</h2>

      <div style={styles.tabs}>
        <button
          style={activeTab === "certificate" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("certificate")}
        >
          Certificates
        </button>

        <button
          style={activeTab === "project" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("project")}
        >
          Projects
        </button>
      </div>

      {activeTab === "certificate" && (
        <form onSubmit={uploadCertificate} style={styles.form}>
          <label style={styles.label}>Certificate Title</label>
          <input
            style={styles.input}
            value={certTitle}
            onChange={(e) => setCertTitle(e.target.value)}
          />

          <label style={styles.label}>Certificate Type</label>
          <select
            style={styles.input}
            value={certType}
            onChange={(e) => setCertType(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="image">Image</option>
          </select>

          <label style={styles.label}>Certificate File</label>
          <input
            type="file"
            style={styles.input}
            onChange={(e) => setCertFile(e.target.files[0])}
          />

          <label style={styles.label}>Thumbnail Image</label>
          <input
            type="file"
            style={styles.input}
            onChange={(e) => setCertThumbnail(e.target.files[0])}
          />

          <button type="submit" style={styles.button}>
            Upload Certificate
          </button>
          <p style={styles.msg}>{certMessage}</p>
        </form>
      )}

      {activeTab === "project" && (
        <form onSubmit={uploadProject} style={styles.form}>
          <label style={styles.label}>Project Title</label>
          <input
            style={styles.input}
            value={projTitle}
            onChange={(e) => setProjTitle(e.target.value)}
          />

          <label style={styles.label}>Description</label>
          <textarea
            style={styles.textarea}
            value={projDesc}
            onChange={(e) => setProjDesc(e.target.value)}
          />

          <label style={styles.label}>Tech Stack (comma separated)</label>
          <input
            style={styles.input}
            value={projTechStack}
            onChange={(e) => setProjTechStack(e.target.value)}
          />

          <label style={styles.label}>GitHub URL</label>
          <input
            style={styles.input}
            value={projGithub}
            onChange={(e) => setProjGithub(e.target.value)}
          />

          <label style={styles.label}>Live URL</label>
          <input
            style={styles.input}
            value={projLive}
            onChange={(e) => setProjLive(e.target.value)}
          />

          <label style={styles.label}>Project Image</label>
          <input
            type="file"
            style={styles.input}
            onChange={(e) => setProjImage(e.target.files[0])}
          />

          <button type="submit" style={styles.button}>
            Upload Project
          </button>
          <p style={styles.msg}>{projMessage}</p>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "0 auto",
    background: "#1b1b1b",
    borderRadius: "12px",
    color: "#fff",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    background: "#333",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#aaa",
  },
  activeTab: {
    padding: "10px 20px",
    background: "#007bff",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
  },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "#fff",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    minHeight: "80px",
    color: "#fff",
  },
  label: { fontSize: "14px", fontWeight: "600" },
  button: {
    padding: "12px",
    background: "#007bff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
  },
  msg: { textAlign: "center", marginTop: "10px" },
};

export default AdminUpload;
