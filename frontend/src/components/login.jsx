import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details:", { username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-xl font-bold mb-4">DC Healthcare System</h2>
        <p className="text-center mb-6">
          Welcome Back! <br />
          Please login with your username and password
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-blue-500 font-medium py-2 rounded-md hover:bg-gray-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
