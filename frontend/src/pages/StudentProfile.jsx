import "../styles/profile.css";

function StudentProfile() {
  return (
    <div>
      <h1>My Profile</h1>
      <div className="profile-card">
        <p><strong>Name:</strong> Akshay</p>
        <p><strong>Email:</strong> akshay@test.com</p>
        <p><strong>Role:</strong> STUDENT</p>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default StudentProfile;