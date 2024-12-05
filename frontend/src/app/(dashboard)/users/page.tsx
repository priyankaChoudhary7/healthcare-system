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
import { UsersTable } from "../user-table";

export default function CustomersPage() {
  const [users, setUsers] = useState(null); // Initialize as null to differentiate loading state
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: "",
    username: "",
    email: "",
    contact_number: "",
    role: "",
    password: "",
  });

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/api/users");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      await api.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user.user_id !== userId)); // Update state
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Handle editing a user
  const handleEdit = async (updatedUser) => {
    try {
      const { data } = await api.put(
        `/api/users/${updatedUser.user_id}`,
        updatedUser
      );
      setUsers(
        users.map((user) => (user.user_id === data.user_id ? data : user))
      ); // Update the edited user in the state
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  // Handle creating a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/users", newUser);
      setUsers([...users, data]); // Add the new user to the state
      setNewUser({
        full_name: "",
        username: "",
        email: "",
        contact_number: "",
        role: "",
        password: "",
      }); // Reset form
      setIsCreateUserOpen(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  // Render loading or fallback state for consistent server/client rendering
  if (loading || users === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Loading users...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage all registered users.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateUserOpen(true)}>
                Create User
              </Button>
            </DialogTrigger>
            {isCreateUserOpen && (
              <>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-[2]" />
                <DialogContent className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-[2]">
                  <h2 className="text-lg font-bold mb-4">Create New User</h2>
                  <form onSubmit={handleCreateUser}>
                    <div className="mb-4">
                      <label>Full Name</label>
                      <Input
                        type="text"
                        value={newUser.full_name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, full_name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Username</label>
                      <Input
                        type="text"
                        value={newUser.username}
                        onChange={(e) =>
                          setNewUser({ ...newUser, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>password</label>
                      <Input
                        type="text"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Email</label>
                      <Input
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Contact Number</label>
                      <Input
                        type="text"
                        value={newUser.contact_number}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            contact_number: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label>Role</label>
                      <Input
                        type="text"
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({ ...newUser, role: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button type="submit">Create User</Button>
                  </form>
                </DialogContent>
              </>
            )}
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <UsersTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
      </CardContent>
    </Card>
  );
}
