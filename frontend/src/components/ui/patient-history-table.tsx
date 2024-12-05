"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import api from "@/utils/api";

export function PatientHistoryTable({
  history,
  patientID,
}: {
  history: Array<{
    history_id: number;
    medical_history: string;
    diagnosis: string;
    treatment: string;
    recorded_at: string;
    recorded_by: number;
    report_id?: string; // Optional report ID
  }>;
  patientID: number;
}) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportContent, setReportContent] = useState({
    title: "",
    content: "",
  });

  const fetchReport = async (reportId: string) => {
    try {
      const { data } = await api.get(`/api/patients/history/report/${reportId}`);
      setReportContent({
        title: data.report_title,
        content: data.report_content,
      });
      setIsReportOpen(true);
    } catch (error) {
      console.error("Failed to fetch report:", error);
      alert("Could not fetch the report. Please try again.");
    }
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Medical History</th>
            <th className="border border-gray-200 p-2">Diagnosis</th>
            <th className="border border-gray-200 p-2">Treatment</th>
            <th className="border border-gray-200 p-2">Dr's Comment</th>
            <th className="border border-gray-200 p-2">Recorded At</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry.history_id}>
              <td className="border border-gray-200 p-2">{entry.history_id}</td>
              <td className="border border-gray-200 p-2">{entry.medical_history}</td>
              <td className="border border-gray-200 p-2">{entry.diagnosis}</td>
              <td className="border border-gray-200 p-2">{entry.treatment}</td>
              <td className="border border-gray-200 p-2">
                {entry.report_id ? (
                  <Button
                    variant="link"
                    onClick={() => fetchReport(entry.report_id)}
                  >
                    View Comment
                  </Button>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border border-gray-200 p-2">{entry.recorded_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Report Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">{reportContent.title}</h2>
          <p>{reportContent.content}</p>
          <Button onClick={() => setIsReportOpen(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
