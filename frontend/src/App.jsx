import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import StudentProfile from "./pages/StudentProfile";
import StudentProjects from "./pages/StudentProjects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <RoleProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </RoleProtectedRoute>
          }
        />

      <Route
  path="/admin/users"
  element={
    <RoleProtectedRoute allowedRole="ADMIN">
      <AdminUsers />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/student/profile"
  element={
    <RoleProtectedRoute allowedRole="STUDENT">
      <StudentProfile />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/student/projects"
  element={
    <RoleProtectedRoute allowedRole="STUDENT">
      <StudentProjects />
    </RoleProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;