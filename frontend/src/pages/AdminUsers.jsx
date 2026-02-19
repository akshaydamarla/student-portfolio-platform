import "../styles/adminUsers.css";

function AdminUsers() {
  const users = [
    { id: 1, name: "Akshay", email: "akshay@test.com", role: "STUDENT" },
    { id: 2, name: "Admin", email: "admin@test.com", role: "ADMIN" },
    { id: 3, name: "Ravi", email: "ravi@test.com", role: "STUDENT" },
  ];

  return (
    <div>
      <h1>Manage Users</h1>
      <p style={{ color: "gray", marginBottom: "20px" }}>
        View and manage registered users
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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;