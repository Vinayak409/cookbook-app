import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    fetch("http://localhost:9000/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response.ok);
        if (response.ok) {
          console.log("user logged in succesfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "250px" }}
    >
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
