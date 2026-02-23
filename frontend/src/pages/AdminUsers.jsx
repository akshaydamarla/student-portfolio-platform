import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/adminUsers.css";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load users", error);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === "ADMIN") {
      alert("Admins cannot delete other admins");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <p style={{ color: "gray", marginBottom: "20px" }}>
        Total Registered Users: <strong>{users.length}</strong>
      </p>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      disabled={user.role === "ADMIN"}
                      onClick={() => handleDelete(user.id, user.role)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
