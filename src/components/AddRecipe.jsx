import React, { useState } from "react";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      img,
      description,
    };

    fetch("http://localhost:9000/recipe/add-recipe", {
      method: "POST",
      body: JSON.stringify(formData),
      mode: "cors",
      headers: {"Authorization" : "BearerToken " + sessionStorage.getItem("token"), "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response.ok);
        if (response.ok) {
          console.log("recipe added successfully");
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
      <h1>Add Recipe</h1>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="desc"
        placeholder="Enter desc"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        name="img"
        placeholder="Enter image url"
        onChange={(e) => setImg(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
