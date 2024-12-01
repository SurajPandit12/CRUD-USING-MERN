import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("Please fill all fields.");
      return;
    }

    const ageNumber = Number(age);
    if (isNaN(ageNumber)) {
      alert("Age must be a valid number.");
      return;
    }

    // Backup state for rollback
    const rollbackUsers = JSON.parse(localStorage.getItem("users")) || [];

    axios
      .post("https://62a59821b9b74f766a3c09a4.mockapi.io/crud", { name, email, age: ageNumber })
      .then((result) => {
        console.log("User created successfully:", result.data);
        addUser(result.data); // Add user to the parent state
        localStorage.setItem("users", JSON.stringify([...rollbackUsers, result.data]));
        alert(`User created: ${result.data.name}`);
        navigate("/"); // Navigate back to users list
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Rolling back to previous state.");
        addUser(rollbackUsers); // Restore previous state
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
