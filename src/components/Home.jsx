import React, { useMemo, useState } from "react";
import Card from "./Card";
import Search from "./Search";
import data from "../data/recipe.json";

const Home = () => {
  const [searchText, setSearchText] = useState("");

  const searchData = useMemo(() => {
    const ans = data.filter((val) => {
      return val.title.toLowerCase().includes(searchText.toLowerCase());
    });
    return ans;
  }, [searchText]);

  console.log(searchData);

  return (
    <>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Card searchData={searchData} />
    </>
  );
};

export default Home;
