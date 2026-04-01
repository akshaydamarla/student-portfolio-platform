import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import StudentProfile from "./pages/StudentProfile";
import StudentProjects from "./pages/StudentProjects";
import Layout from "./layout/Layout";
import AdminProjects from "./pages/AdminProjects";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <Layout />
            </RoleProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
        </Route>

        {/* STUDENT ROUTES */}
        <Route
          element={
            <RoleProtectedRoute allowedRole="STUDENT">
              <Layout />
            </RoleProtectedRoute>
          }
        >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/projects" element={<StudentProjects />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </BrowserRouter>
  );
}

export default App;