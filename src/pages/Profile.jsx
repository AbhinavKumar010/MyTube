import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function Profile() {
  const { user, setUser } = useContext(AuthContext); // assuming auth context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axios.get("/api/profile")
      .then(res => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          password: "", // leave blank for security
          profilePic: res.data.profilePic || null
        });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.profilePic) data.append("profilePic", formData.profilePic);

    try {
      const res = await axios.put("/api/profile", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Profile updated successfully!");
      setUser(res.data); // update auth context
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password (leave blank to keep current):</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" name="profilePic" onChange={handleChange} />
          {formData.profilePic && typeof formData.profilePic === "string" && (
            <img
              src={formData.profilePic}
              alt="Profile"
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: "50%" }}
            />
          )}
        </div>
        <button type="submit" disabled={loading}>Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
