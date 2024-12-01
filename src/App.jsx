import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import Users from "./Users";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users on mount
  useEffect(() => {
    axios
      .get("https://62a59821b9b74f766a3c09a4.mockapi.io/crud")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  // Add user to the list
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser addUser={addUser} />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
