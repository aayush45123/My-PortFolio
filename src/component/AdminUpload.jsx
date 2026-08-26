import React, { useState } from "react";
import api from "../api/axios";

const AdminUpload = () => {
  const [activeTab, setActiveTab] = useState("certificate");

  // Certificate states
  const [certTitle, setCertTitle] = useState("");
  const [certType, setCertType] = useState("pdf");
  const [certFile, setCertFile] = useState(null);
  const [certThumbnail, setCertThumbnail] = useState(null);
  const [certLoading, setCertLoading] = useState(false);
  const [certMessage, setCertMessage] = useState("");

  // Project states
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTechStack, setProjTechStack] = useState("");
  const [projGithub, setProjGithub] = useState("");
  const [projLive, setProjLive] = useState("");
  const [projImage, setProjImage] = useState(null);
  const [projLoading, setProjLoading] = useState(false);
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

    setCertLoading(true);
    setCertMessage("Uploading to Cloudinary...");

    try {
      await api.post("/api/certificates", formData);
      setCertMessage("Certificate uploaded to Cloudinary successfully!");
      setCertTitle("");
      setCertFile(null);
      setCertThumbnail(null);
    } catch (err) {
      console.error(err);
      setCertMessage("Certificate upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setCertLoading(false);
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

    setProjLoading(true);
    setProjMessage("Uploading to Cloudinary...");

    try {
      await api.post("/api/projects", formData);
      setProjMessage("Project uploaded to Cloudinary successfully!");
      setProjTitle("");
      setProjDesc("");
      setProjTechStack("");
      setProjGithub("");
      setProjLive("");
      setProjImage(null);
    } catch (err) {
      console.error(err);
      setProjMessage("Project upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setProjLoading(false);
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
            disabled={certLoading}
            placeholder="e.g. Meta Frontend Developer"
          />

          <label style={styles.label}>Certificate Type</label>
          <select
            style={styles.input}
            value={certType}
            onChange={(e) => setCertType(e.target.value)}
            disabled={certLoading}
          >
            <option value="pdf">PDF</option>
            <option value="image">Image</option>
          </select>

          <label style={styles.label}>Certificate File (PDF or Image)</label>
          <input
            type="file"
            style={styles.input}
            onChange={(e) => setCertFile(e.target.files[0])}
            disabled={certLoading}
          />

          <label style={styles.label}>Thumbnail Image</label>
          <input
            type="file"
            style={styles.input}
            accept="image/*"
            onChange={(e) => setCertThumbnail(e.target.files[0])}
            disabled={certLoading}
          />

          <button type="submit" style={styles.button} disabled={certLoading}>
            {certLoading ? "Uploading to Cloudinary..." : "Upload Certificate"}
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
            disabled={projLoading}
            placeholder="e.g. E-Commerce Platform"
          />

          <label style={styles.label}>Description</label>
          <textarea
            style={styles.textarea}
            value={projDesc}
            onChange={(e) => setProjDesc(e.target.value)}
            disabled={projLoading}
            placeholder="Describe the project..."
          />

          <label style={styles.label}>Tech Stack (comma separated)</label>
          <input
            style={styles.input}
            value={projTechStack}
            onChange={(e) => setProjTechStack(e.target.value)}
            disabled={projLoading}
            placeholder="React, Node.js, MongoDB"
          />

          <label style={styles.label}>GitHub URL</label>
          <input
            style={styles.input}
            value={projGithub}
            onChange={(e) => setProjGithub(e.target.value)}
            disabled={projLoading}
            placeholder="https://github.com/..."
          />

          <label style={styles.label}>Live URL</label>
          <input
            style={styles.input}
            value={projLive}
            onChange={(e) => setProjLive(e.target.value)}
            disabled={projLoading}
            placeholder="https://..."
          />

          <label style={styles.label}>Project Image</label>
          <input
            type="file"
            style={styles.input}
            accept="image/*"
            onChange={(e) => setProjImage(e.target.files[0])}
            disabled={projLoading}
          />

          <button type="submit" style={styles.button} disabled={projLoading}>
            {projLoading ? "Uploading to Cloudinary..." : "Upload Project"}
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
    margin: "100px auto 40px",
    background: "var(--card-bg, #111)",
    borderRadius: "8px",
    border: "1px solid var(--border-color, #222)",
    color: "var(--text-primary, #fff)",
  },
  heading: { textAlign: "center", marginBottom: "20px", fontFamily: "var(--font-heading)" },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  tab: {
    padding: "10px 20px",
    background: "var(--bg-secondary, #222)",
    border: "1px solid var(--border-color, #333)",
    borderRadius: "4px",
    cursor: "pointer",
    color: "var(--text-secondary, #aaa)",
    fontFamily: "var(--font-body)",
    fontWeight: "500",
  },
  activeTab: {
    padding: "10px 20px",
    background: "var(--accent, #6C63FF)",
    border: "1px solid var(--accent, #6C63FF)",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontWeight: "600",
  },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  input: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid var(--border-color, #333)",
    background: "var(--bg-primary, #0a0a0a)",
    color: "var(--text-primary, #fff)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid var(--border-color, #333)",
    background: "var(--bg-primary, #0a0a0a)",
    minHeight: "90px",
    color: "var(--text-primary, #fff)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
  },
  label: { fontSize: "12px", fontWeight: "600", color: "var(--text-tertiary, #888)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" },
  button: {
    padding: "13px",
    background: "var(--accent, #6C63FF)",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "600",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    marginTop: "8px",
    transition: "opacity 0.2s",
  },
  msg: { textAlign: "center", marginTop: "10px", fontSize: "14px", color: "var(--accent, #6C63FF)" },
};

export default AdminUpload;
