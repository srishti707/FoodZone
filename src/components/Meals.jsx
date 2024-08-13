import { useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../hook/useHttp";
import MealItem from "./MealItem";

export default function Meals() {
  const { data:loadedMeals,loading, error} = useHttp("http://localhost:3000/meals",{},[]);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
