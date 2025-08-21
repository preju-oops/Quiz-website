import axios from "axios";
import { useState } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = { name, email, password };

    axios
      .post("http://localhost:3000/users/create", finalData)
      .then(() => {
        setSuccessMessage("✅ User registered successfully!");
        setErrorMessage("");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("error => ", error);
        const errors = error?.response?.data?.message || "❌ An error occurred";
        setErrorMessage(errors);
        setSuccessMessage("");
      });
  };

  // ✨ Inline Styles
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #74b9ff, #a29bfe)",
      color: "#2d3436",
      fontFamily: "Poppins, sans-serif",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      textAlign: "center" as const,
    },
    heading: {
      marginBottom: "10px",
      fontSize: "1.8rem",
      color: "#2d3436",
    },
    subText: {
      marginBottom: "20px",
      fontSize: "0.95rem",
      color: "#2f3542",
    },
    inputGroup: {
      marginBottom: "15px",
      textAlign: "left" as const,
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: 600,
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #dfe6e9",
      outline: "none",
      fontSize: "1rem",
      transition: "0.3s",
    },
    inputFocus: {
      border: "1px solid #6c5ce7",
      boxShadow: "0 0 6px rgba(108, 92, 231, 0.5)",
    },
    button: {
      marginTop: "10px",
      padding: "12px",
      width: "100%",
      background: "#6c5ce7",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      background: "#341f97",
    },
    error: { color: "red", marginBottom: "10px" },
    success: { color: "green", marginBottom: "10px" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Register</h1>
      <p style={styles.subText}>Create an account to continue</p>

      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1px solid #6c5ce7")
            }
            onBlur={(e) => (e.currentTarget.style.border = "1px solid #dfe6e9")}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1px solid #6c5ce7")
            }
            onBlur={(e) => (e.currentTarget.style.border = "1px solid #dfe6e9")}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1px solid #6c5ce7")
            }
            onBlur={(e) => (e.currentTarget.style.border = "1px solid #dfe6e9")}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#341f97")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#6c5ce7")
          }
        >
          Register 🚀
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
