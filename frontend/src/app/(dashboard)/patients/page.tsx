"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";
import { PatientTable } from "../patient-table";

export default function PatientsPage() {
  const [patients, setPatients] = useState(null); // Initialize as null to differentiate loading state
  const [loading, setLoading] = useState(true);
  const [isCreatePatientOpen, setIsCreatePatientOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patient_name: "",
    patient_email: "",
    contact_number: "",
    address: "",
    date_of_birth: "",
    added_by: "",
  });

  // Fetch patients from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await api.get("/api/patients");
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Handle patient deletion
  const handleDelete = async (patientId) => {
    try {
      await api.delete(`/api/patients/${patientId}`);
      setPatients(patients.filter((patient) => patient.patient_id !== patientId)); // Update state
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

  // Handle editing a patient
  const handleEdit = async (updatedPatient) => {
    try {
      const { data } = await api.put(
        `/api/patients/${updatedPatient.patient_id}`,
        updatedPatient
      );
      setPatients(
        patients.map((patient) =>
          patient.patient_id === data.patient_id ? data : patient
        )
      ); // Update the edited patient in the state
    } catch (error) {
      console.error("Failed to edit patient:", error);
    }
  };

  // Handle creating a new patient
  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/patients", newPatient);
      setPatients([...patients, data]); // Add the new patient to the state
      setNewPatient({
        patient_name: "",
        patient_email: "",
        contact_number: "",
        address: "",
        date_of_birth: "",
        added_by: "",
      }); // Reset form
      setIsCreatePatientOpen(false);
    } catch (error) {
      console.error("Failed to create patient:", error);
    }
  };

  // Render loading or fallback state for consistent server/client rendering
  if (loading || patients === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
          <CardDescription>Loading patients...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full">
          <div>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Manage all registered patients.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreatePatientOpen(true)}>
                Create Patient
              </Button>
            </DialogTrigger>
            {isCreatePatientOpen && (
              <>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-[2]" />
                <DialogContent className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-[2]">
                  <h2 className="text-lg font-bold mb-4">Create New Patient</h2>
                  <form onSubmit={handleCreatePatient}>
                    <div className="mb-4">
                      <label>Patient Name</label>
                      <Input
                        type="text"
                        value={newPatient.patient_name}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            patient_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Email</label>
                      <Input
                        type="email"
                        value={newPatient.patient_email}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            patient_email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label>Contact Number</label>
                      <Input
                        type="text"
                        value={newPatient.contact_number}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            contact_number: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label>Address</label>
                      <Input
                        type="text"
                        value={newPatient.address}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label>Date of Birth</label>
                      <Input
                        type="date"
                        value={newPatient.date_of_birth}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label>Added By (User ID)</label>
                      <Input
                        type="number"
                        value={newPatient.added_by}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            added_by: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <Button type="submit">Create Patient</Button>
                  </form>
                </DialogContent>
              </>
            )}
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <PatientTable
          patients={patients}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </CardContent>
    </Card>
  );
}
