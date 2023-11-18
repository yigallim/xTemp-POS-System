import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { foods, foodCategories } from "../config";
import {
    searchChange,
    filterChange,
} from "../redux/actions/search_food_action";
const { Search } = Input;

function Menu({ searchValue, filterValue, searchChange, filterChange }) {
    const filteredFoods = foodCategories.reduce((result, category) => {
        const categoryId = category.id;
        const categoryFoods = foods.filter(
            (food) =>
                food.categoryId === categoryId &&
                (filterValue === "" ||
                    food.name.toLowerCase().includes(filterValue.toLowerCase()))
        );
        result[categoryId] = categoryFoods;
        return result;
    }, {});

    const handleSearchChange = (event) => searchChange(event.target.value);

    const handleSearch = (value) => filterChange(value);

    return (
        <section className="pt-4 md:pt-6">
            <h1 className="text-4xl font-bold text-primary mb-2 mx-3 md:mx-8">
                Menu
            </h1>
            <div className="bg-primary h-1 w-16 mb-3 md:mb-5 mx-3 md:mx-8"></div>

            <div className="mx-3 md:mx-8">
                <Search
                    placeholder="search food name"
                    allowClear
                    onSearch={handleSearch}
                    onChange={handleSearchChange}
                    value={searchValue}
                />
            </div>

            {Object.keys(filteredFoods).map((categoryId) => (
                <div
                    key={categoryId}
                    id={`category-${categoryId}`}
                    className="py-3 px-3 md:py-5 md:px-8"
                >
                    <h2 className="text-2xl font-bold mb-2">
                        {
                            foodCategories.find(
                                (category) =>
                                    category.id === parseInt(categoryId, 10)
                            ).name
                        }
                    </h2>
                    <ul>
                        {filteredFoods[categoryId].map((food) => (
                            <li
                                key={food.id}
                                className="flex border-b border-gray-300 py-2 md:py-3 w-full"
                            >
                                <img
                                    src={food.src}
                                    alt={food.name + " png"}
                                    className="food-img bg-gray-300 rounded-md w-20 h-20 md:w-28 md:h-28 object-cover flex-shrink-0"
                                />
                                <div className="pl-3 md:pl-5 flex justify-between w-full">
                                    <div>
                                        <p className="md:text-lg">
                                            {food.id}. {food.name}
                                        </p>
                                        <p className="text-gray-400 text-xs md:text-base">
                                            {food.description}
                                        </p>
                                    </div>
                                    <div className="ml-3 font-semibold md:text-lg">
                                        {parseFloat(food.price).toFixed(2)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}

export default connect(
    state => ({
        searchValue: state.searchFoodReducer.search,
        filterValue: state.searchFoodReducer.filter,
    }),
    {
        searchChange,
        filterChange,
    }
)(Menu);
