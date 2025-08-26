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
    const response = await axios.post("http://localhost:3000/api/users/login", {
  email,
  password,
});


      const token = response.data.accessToken;
      const role = response.data.role;

      // Store token
      localStorage.setItem("accessToken", token);

      // Update global auth state
      setAuthState({
        isAuth: true,
        role: role,
      });

      // Redirect to dashboard
      window.location.href = "/auth/home";
    } catch (error: any) {
      console.error("Login error => ", error);

      if (error.response) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        setErrorMessage("No response from server. Is backend running?");
      } else {
        setErrorMessage(error.message || "Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password:
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
