import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/profile.css";

function StudentProfile() {

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/student/profile");
        setProfile(res.data);
        setName(res.data.name);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put("/api/student/profile", null, {
        params: {
          name: name,
          password: password,
        },
      });

      alert("Profile updated successfully");
      setEditMode(false);
      setPassword("");

      // Refresh profile data
      const res = await axios.get("/api/student/profile");
      setProfile(res.data);

    } catch (error) {
      alert("Update failed");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Profile</h1>

      <div className="profile-card">

        {!editMode ? (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>

            <button
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep same password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div style={{ marginTop: "15px" }}>
              <button className="edit-btn" onClick={handleUpdate}>
                Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditMode(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default StudentProfile;