import axios from 'axios';
import React, { useState } from 'react';

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();

  let Submit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      console.log("Please fill all fields.");
      return;
    }
  
    const ageNumber = Number(age);
    if (isNaN(ageNumber)) {
      console.log("Age must be a valid number.");
      return;
    }
  
    axios
      .post("https://62a59821b9b74f766a3c09a4.mockapi.io/crud", { name, email, age: ageNumber })
      .then((result) => {
        console.log("User created successfully:", result.data);
        // You can now use the created user's data here, for example:
        alert(`User created: ${result.data.name}`);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
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
