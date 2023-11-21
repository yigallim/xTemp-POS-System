import React from "react";
import { useParams, Link } from "react-router-dom";
import { foodCategories, foods } from "../config";

export default function FoodCustomize() {
    const { seat, foodId } = useParams();

    const actualFoodId = foodId.substring("customize-".length);
    const food = foods.find((item) => item.id === actualFoodId);
    const foodCategory = foodCategories.find(
        (category) => category.id === food.categoryId
    );

    return (
        <div className="min-h-screen md:mx-28 lg:mx-60 md:border-x md:shadow-2xl pb-20">
            <p>FoodCustomize</p>
            <p>Selected Food: {food.name}</p>
            <p>Category: {foodCategory.name}</p>
            <Link to={`/${seat}`}>Back to Ordering</Link>
        </div>
    );
}
