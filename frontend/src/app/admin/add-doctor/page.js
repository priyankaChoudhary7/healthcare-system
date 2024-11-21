"use client";

import React, { useState } from "react";

const AddDoctor = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    contact: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `User Created Successfully!\nDetails:\n${JSON.stringify(
        formData,
        null,
        2
      )}`
    );
    // Optionally, reset the form
    setFormData({
      name: "",
      username: "",
      password: "",
      email: "",
      contact: "",
      role: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-xl font-bold">DC Healthcare System</h2>
        <p className="text-center mt-4 mb-6">Add new doctor into the system</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-blue-600 bg-white rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-blue-600 bg-white rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-blue-600 bg-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-blue-600 bg-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium mb-1">
              Contact Number:
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 text-blue-600 bg-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role:
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 text-blue-600 bg-white rounded-md"
              placeholder="e.g., Doctor"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-200"
          >
            Add User
          </button>
        </form>
        <button
          className="block w-full bg-gray-200 text-blue-600 px-4 py-2 mt-4 rounded-md shadow hover:bg-gray-300"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;
