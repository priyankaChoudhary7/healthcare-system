"use client";

import React, { useState } from "react";

const AddPatientPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [patientComments, setPatientComments] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the patient data submission here
    console.log({
      fullName,
      email,
      contactNumber,
      address,
      dob,
      patientComments,
      doctorNotes,
      reportFile,
    });
    setSuccessMessage("Patient record has been created successfully!");
    // Reset the form
    setFullName("");
    setEmail("");
    setContactNumber("");
    setAddress("");
    setDob("");
    setPatientComments("");
    setDoctorNotes("");
    setReportFile(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-blue-600 text-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-center text-2xl font-bold mb-4">
          DC Healthcare System
        </h1>
        <p className="text-center mb-6 text-xl">Add Patient Information</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-lg font-bold underline">
              Patient’s Personal Information
            </h2>
            <label className="block mt-2">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <label className="block mt-2">Email ID:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <label className="block mt-2">Contact Number:</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <label className="block mt-2">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <label className="block mt-2">Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold underline">
              Patients Medical Information
            </h2>
            <label className="block mt-2">Patient Comments:</label>
            <textarea
              value={patientComments}
              onChange={(e) => setPatientComments(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <label className="block mt-2">Doctor’s Comment/Notes:</label>
            <textarea
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <label className="block mt-2">Upload Report:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-md shadow hover:bg-gray-100 mt-4"
          >
            Add Patient
          </button>
        </form>
        {successMessage && (
          <p className="mt-4 text-center text-green-400 font-bold">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddPatientPage;
