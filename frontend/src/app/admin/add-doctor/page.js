"use client";
import React from "react";

const AddDoctor = ({ onBack }) => {
  return (
    <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-center text-xl font-bold">DC Healthcare System</h2>
      <p className="text-center mt-4">Add new doctor into the system</p>
      <p className="text-center text-sm mb-6">*Please fill below details*</p>
      <div className="space-y-4">
        <p>
          Full Name: <span className="font-bold text-yellow-300">Joe Bob</span>
        </p>
        <p>
          Username: <span className="font-bold text-yellow-300">jbob</span>
        </p>
        <p>
          Password: <span className="font-bold text-yellow-300">****</span>
        </p>
        <p>
          Email: <span className="font-bold text-yellow-300">jb@gmail.com</span>
        </p>
        <p>
          Contact Number:{" "}
          <span className="font-bold text-yellow-300">9000000</span>
        </p>
        <p>
          Role: <span className="font-bold text-yellow-300">Doctor</span>
        </p>
      </div>
      <button
        className="bg-white text-blue-600 px-4 py-2 mt-6 rounded-md shadow hover:bg-gray-100"
        onClick={() => alert("User has been created successfully!")}
      >
        Add User
      </button>
      <button
        className="block bg-white text-blue-600 px-4 py-2 mt-4 rounded-md shadow hover:bg-gray-100"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
};

export default AddDoctor;
