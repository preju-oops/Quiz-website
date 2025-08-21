import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Log in to continue your quiz journey 🎯
        </p>

        {/* Login Form Component */}
        <LoginForm />

        {/* Footer / Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
