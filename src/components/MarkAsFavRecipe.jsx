import React, { useEffect, useState } from "react";

const MarkAsFavRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(null);

  const handleClick = (recipeId) => {
    fetch(`http://localhost:9000/recipe/mark-as-fav-recipe/${recipeId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "BearerToken " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        // console.log(response.ok);
        if (response.ok) {
          console.log("recipe marked favorite successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllRecipes = () => {
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
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <div>
        {recipes.map((obj) => {
          console.log(obj);
          const { title, img, description, recipeId } = obj;
          return (
            <div>
              <li key={title}>{title}</li>
              <img
                style={{ width: "200px", height: "200px" }}
                src={img}
                alt="img"
              />
              <p>{description}</p>
              <button onClick={() => handleClick(recipeId)}>
                Mark as Fav Recipe
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MarkAsFavRecipe;
