"use client";

import React from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ routing

const AdminHomePage = () => {
  const router = useRouter(); // Initialize router

  const handleAddDoctor = () => {
    router.push("/admin/add-doctor"); // Navigate to the Add Doctor page
    console.log("Add new doctor clicked");
  };

  const handleViewPatientDetails = () => {
    // Logic for viewing patient details
    console.log("View patient details clicked");
  };

  const handleLogout = () => {
    router.push("/login"); // Navigate to the Logout page
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin's Home Page</h1>
      <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-xl font-bold">DC Healthcare System</h2>
        <p className="text-center mt-4 mb-6">Welcome Admin!</p>
        <div className="flex justify-around mb-4">
          <button
            onClick={handleAddDoctor}
            className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
          >
            Add new doctor
          </button>
          <button
            onClick={handleViewPatientDetails}
            className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
          >
            View Patient Details
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHomePage;
