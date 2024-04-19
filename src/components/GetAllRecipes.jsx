import React, { useState } from "react";

const GetAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();

    // const formData = {
    //   title,
    //   desc,
    //   img,
    // };

    fetch("http://localhost:9000/recipe/get-all-recipes", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "BearerToken " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        // console.log(response.ok);
        const data = await response.json();
        setRecipes(data);
        if (response.ok) {
          console.log("recipe retrived successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(recipes);
  };

  return (
    <>
      <button onClick={handleClick}>Add Recipe</button>
      <div>
        {
            recipes.map((obj) => {
                console.log(obj)
                const {title, img, description} = obj;
                return (
                    <div>
                    
                        <li key={title}>{title}</li>
                        <img style={{width: "200px", height: "200px"}} src={img} alt="img" />
                        <p>{description}</p>
                    </div>
                )
            })
        }
      </div>
    </>
  );
};

export default GetAllRecipes;
