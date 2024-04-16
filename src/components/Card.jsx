import React from "react";
import data from "../data/recipe.json";
const Card = ({ searchData }) => {
  //   return (
  // <div style={{border: "2px solid red", width : "250px"}}>
  //   <img
  //     style={{width: "200px"}}
  //     src="https://media.istockphoto.com/id/496546118/photo/slice-of-fresh-italian-classic-original-pepperoni-pizza-isolated.jpg?s=612x612&w=0&k=20&c=7aYapAwoe4fO5jRiNMIFiflIztcBAA8s-GLqAmBiSgA="
  //     alt="Pancake"
  //   />
  //   <div>
  //     <h4>Pancake</h4>
  //     <p>this is recipe card of Pancake</p>
  //   </div>
  // </div>

  return (
    <>
      {searchData.map((recipeObj) => {
        return (
          <div>
            <img
              style={{ width: "200px" }}
              src={recipeObj.img}
              alt={recipeObj.title}
            />
            <div>
              <p>{recipeObj.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
