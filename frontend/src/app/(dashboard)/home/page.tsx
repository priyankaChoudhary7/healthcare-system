"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/utils/api";

export default function HomePage() {
  const [stats, setStats] = useState({ users: 0, patients: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users and patients counts
        const [usersResponse, patientsResponse] = await Promise.all([
          api.get("/api/users"),
          api.get("/api/patients"),
        ]);

        // Update the stats state
        setStats({
          users: usersResponse.data.length,
          patients: patientsResponse.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Loading statistics...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Total registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.users}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
          <CardDescription>Total registered patients</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.patients}</p>
        </CardContent>
      </Card>
    </div>
  );
}
