// src/pages/Register.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Make sure to run: npm install lucide-react

const departments = [
  "Computer Engineering",
  "Information Technology",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
];

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    semester: "",
    dateOfBirth: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    console.log(`Toast (${type}): ${message}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('vppcoe_users') || '[]');
      if (users.find(u => u.email === formData.email)) {
        showToast("A user with this email already exists.", "error");
        setLoading(false);
        return;
      }

      users.push({ id: Date.now().toString(), ...formData });
      localStorage.setItem('vppcoe_users', JSON.stringify(users));
      
      showToast("Registration successful! Please take the career quiz.", "success");
      navigate('/quiz');
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <header className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Start your journey towards a successful career</p>
        </header>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Department</label>
              <select onChange={(e) => handleInputChange('department', e.target.value)} required>
                <option value="" disabled selected>Select department</option>
                {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Current Semester</label>
              <select onChange={(e) => handleInputChange('semester', e.target.value)} required>
                <option value="" disabled selected>Select semester</option>
                {semesters.map((sem) => <option key={sem} value={sem}>{sem}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <footer className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="toggle-link">Sign in</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}