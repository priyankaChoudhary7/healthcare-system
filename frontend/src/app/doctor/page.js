"use client"; // Required to enable client-side behavior in App Router

import { useRouter } from "next/navigation";

const DoctorHomePage = () => {
  const router = useRouter();

  const navigateToAddPatient = () => {
    router.push("doctor//add-patient"); // Navigate to the Add Patient page
  };

  const handleLogout = () => {
    router.push("/login"); // Navigate to the Logout page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-blue-600 text-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-center text-2xl font-bold mb-4">
          DC Healthcare System
        </h1>
        <p className="text-center mb-6 text-xl">Welcome Doctor!</p>
        <div className="space-y-4 text-center">
          <button
            onClick={navigateToAddPatient}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-md shadow hover:bg-gray-100"
          >
            Add New Patient
          </button>
          <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-md shadow hover:bg-gray-100">
            View Patient History
          </button>
          <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-md shadow hover:bg-gray-100">
            Update Patient Information
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorHomePage;
