import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const { setAuthState } = useContext<IAuthContext>(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); 
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);

      // Update global auth state immediately
      setAuthState({
        isAuth: true,
        role: response.data.role || "guest",
      });

      // Navigate to homepage
      window.location.href = "/";
    } catch (error: any) {
      console.error("Login error => ", error);

      if (error.response) {
        // Server responded with status (400, 401, 500, etc.)
        setErrorMessage(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        // Request made but no response (CORS, server down)
        setErrorMessage("No response from server. Is backend running?");
      } else {
        // Something else
        setErrorMessage(error.message || "Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login Form</h1>
      <p>Login to Continue</p>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
