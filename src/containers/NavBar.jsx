import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Anchor, Input } from "antd";
import { foodCategories } from "../config";
import {
    searchChange,
    filterChange,
} from "../redux/actions/search_food_action";
const { Search } = Input;

function NavBar({ searchValue, searchChange, filterChange }) {
    const [showNavBar, setShowNavBar] = useState(false);
    const generateAnchorLinks = () => {
        return foodCategories.map((category) => ({
            key: `category-${category.id}`,
            href: `#category-${category.id}`,
            title: category.name,
        }));
    };

    const anchorLinks = generateAnchorLinks();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 300;
            setShowNavBar(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearchChange = (event) => searchChange(event.target.value);

    const handleSearch = (value) => filterChange(value);

    return (
        <div
            className={`shadow-xl fixed top-0 bg-white left-0 right-0 md:left-28 md:right-28 lg:left-60 lg:right-60 p-3 pt-2 z-10 ${
                showNavBar ? "fade-in" : "fade-out"
            }`}
        >
            <Anchor
                className="pb-3 custom-anchor"
                direction="horizontal"
                items={anchorLinks}
                targetOffset={78}
                replace
            />
            <Search
                placeholder="search food name"
                allowClear
                onSearch={handleSearch}
                onChange={handleSearchChange}
                value={searchValue}
            />
        </div>
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
)(NavBar);
