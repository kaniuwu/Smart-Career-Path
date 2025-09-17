// src/pages/Dashboard.jsx

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react";

// --- NEW IMPORTS FOR ICONS ---
import { User, BookOpen, Award, Target, ListChecks, Lightbulb } from 'lucide-react';


// Mock data, in a real app this would come from an API
const mockUser = {
  name: "John Doe",
  department: "Computer Engineering",
  profilePicture: "" // Add a URL to a profile picture if you have one
};

const mockCourses = [
  { id: 1, name: "Advanced JavaScript", domain: "Web Development" },
  { id: 2, name: "Data Structures & Algorithms", domain: "Computer Science" },
  { id: 3, name: "Machine Learning Basics", domain: "AI/ML" },
];

const mockAchievements = [
  "Mock drive attended",
  "Profile completed",
  "Resume uploaded"
];

export default function Dashboard() {
  const [user] = useState(mockUser);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('vppcoe_todos') || '[]');
    setTodos(savedTodos);
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const updatedTodos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
    setTodos(updatedTodos);
    localStorage.setItem('vppcoe_todos', JSON.stringify(updatedTodos));
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('vppcoe_todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('vppcoe_todos', JSON.stringify(updatedTodos));
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>Welcome back, {user.name}!</h2>
        <p>Ready to continue your journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="profile-card">
          <div className="avatar">
            {/* --- PROFILE ICON --- */}
            {user.profilePicture ? <img src={user.profilePicture} alt="Profile" /> : <User size={32} color="white" />}
          </div>
          <h3>{user.name}</h3>
          <p>{user.department}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            {/* --- COURSES ENROLLED ICON --- */}
            <BookOpen size={32} color="#7A698B" />
          </div>
          <h4>5</h4>
          <p>Courses Enrolled</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            {/* --- COURSES COMPLETED ICON --- */}
            <CheckCircle size={32} color="#28a745" />
          </div>
          <h4>3</h4>
          <p>Courses Completed</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            {/* --- CERTIFICATES ICON --- */}
            <Award size={32} color="#FBC02D" />
          </div>
          <h4>2</h4>
          <p>Certificates</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        <div className="card">
          <h3 className="card-title">
            {/* --- WEEKLY TO-DO LIST ICON --- */}
            <ListChecks size={20} />
            Weekly To-Do List
          </h3>
          <div className="todo-input-group">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}><Plus size={18} /></button>
          </div>
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <button onClick={() => toggleTodo(todo.id)} className="todo-check">
                  {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                </button>
                <span>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)} className="todo-delete"><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title">
            {/* --- CURRENT FOCUS ICON --- */}
            <Lightbulb size={20} />
            Current Focus
          </h3>
          <div className="focus-list">
            {mockCourses.map(course => (
              <div key={course.id} className="focus-item">
                <h4>{course.name}</h4>
                <span className="domain-badge">{course.domain}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h3 className="card-title">Recent Achievements</h3>
        <div className="achievements-grid">
          {mockAchievements.map((ach, index) => (
            <div key={index} className="achievement-item">
              {ach}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}