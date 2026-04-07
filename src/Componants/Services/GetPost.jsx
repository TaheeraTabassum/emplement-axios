import axios from "axios";
import React, { useState } from "react";

export default function GetPost() {
  const [user, setUser] = useState();

  const addUser = async () => {
    const newUser = {
      name: "Tahira",
      email: "tahira@gmail.com",
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newUser,
    );
    console.log(res.data);
    setUser(res.data);
  };
  const updateUser = async () => {
    const updatedUser = {
      name: "Taheera",
      email: "tahira@gmail.com",
    };

    const res = await axios.put(
      "https://jsonplaceholder.typicode.com/users/1",
      updatedUser,
    );

    console.log(res.data);
    setUser(res.data)
  };
  return (
    <div>
      <p>name: {user?.name}</p>
      <p>email: {user?.email}</p>
      <button onClick={addUser}>Add User </button>
      <button onClick={updateUser}>Update User </button>
    </div>
  );
}
