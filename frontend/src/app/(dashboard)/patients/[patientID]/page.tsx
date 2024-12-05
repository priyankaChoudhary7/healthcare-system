"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PatientHistoryTable } from "@/components/ui/patient-history-table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import api from "@/utils/api";

export default function PatientHistoryPage() {
  const { patientID: pid } = useParams(); // Extract patientID from the URL
  const [patientID, setPatientID] = useState<number | null>(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddHistoryOpen, setIsAddHistoryOpen] = useState(false);
  const [newHistory, setNewHistory] = useState({
    patient_id: 0,
    medical_history: "",
    diagnosis: "",
    treatment: "",
    recorded_by: 0,
    report_title: "",
    report_content: "",
  });

  useEffect(() => {
    setPatientID(parseInt(pid, 10));
  }, [pid]);

  if (isNaN(patientID)) {
    return <p>Invalid patient ID.</p>;
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get(`/api/patients/history/${patientID}`);
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch patient history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [patientID]);

  const handleAddHistory = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        ...newHistory,
        patient_id: patientID, // Ensure the patient ID is included
      };
      const { data } = await api.post("/api/patients/history/", requestBody);
      setHistory((prevHistory) => [...prevHistory, data]); // Update state with the new entry
      setNewHistory({
        patient_id: 0,
        medical_history: "",
        diagnosis: "",
        treatment: "",
        recorded_by: 0,
        report_title: "",
        report_content: "",
      });
      setIsAddHistoryOpen(false);
    } catch (error) {
      console.error("Failed to add patient history:", error);
      alert("Error adding history. Please check the details and try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full">
          <div>
            <CardTitle>Patient History</CardTitle>
            <CardDescription>Manage the medical history of the patient.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddHistoryOpen(true)}>Add History</Button>
            </DialogTrigger>
            {isAddHistoryOpen && (
              <>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-[2]" />
                <DialogContent className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-[2]">
                  <h2 className="text-lg font-bold mb-4">Add Patient History</h2>
                  <form onSubmit={handleAddHistory}>
                    <div className="mb-4">
                      <label>Medical History</label>
                      <Input
                        type="text"
                        value={newHistory.medical_history}
                        onChange={(e) =>
                          setNewHistory({ ...newHistory, medical_history: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Diagnosis</label>
                      <Input
                        type="text"
                        value={newHistory.diagnosis}
                        onChange={(e) =>
                          setNewHistory({ ...newHistory, diagnosis: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Treatment</label>
                      <Input
                        type="text"
                        value={newHistory.treatment}
                        onChange={(e) =>
                          setNewHistory({ ...newHistory, treatment: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Recorded By (User ID)</label>
                      <Input
                        type="number"
                        value={newHistory.recorded_by}
                        onChange={(e) =>
                          setNewHistory({ ...newHistory, recorded_by: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Report Title</label>
                      <Input
                        type="text"
                        value={newHistory.report_title}
                        onChange={(e) =>
                          setNewHistory({ ...newHistory, report_title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Report Content</label>
                      <Input
                        type="text"
                        value={newHistory.report_content}
                        onChange={(e) =>
                          setNewHistory({ ...newHistory, report_content: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button type="submit">Add History</Button>
                  </form>
                </DialogContent>
              </>
            )}
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PatientHistoryTable history={history} patientID={patientID} />
        )}
      </CardContent>
    </Card>
  );
}
