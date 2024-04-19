import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    // console.log(formData);

    fetch("http://localhost:9000/auth/signup", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) {
          const resolvedResponse = await response.json()
          sessionStorage.setItem('token', resolvedResponse.token)
          console.log("User has been successfully signed up");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("There was an error sending the form data to the server");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "250px" }}
    >
      <h1>Sign up</h1>
      <input
        type="email"
        name="emailofuser"
        placeholder="Enter your email"
        // value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="passwordofuser"
        placeholder="Enter your password"
        // value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Signup;
