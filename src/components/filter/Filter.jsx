import React, { useEffect, useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("bedroom") || 100000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(debouncedQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const handleChange = (e) => {
    setDebouncedQuery({
      ...debouncedQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setSearchParams(query);
    console.log("[handleFilter]", query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="filter-content">
        <div className="search-input">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
        <div className="filter-sec">
          <div className="item">
            <select
              name="type"
              id="type"
              onChange={handleChange}
              defaultValue={query.type}
            >
              <option value="any">Any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <select
              name="property"
              id="property"
              onChange={handleChange}
              defaultValue={query.property}
            >
              <option value="any">Any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <input
              type="number"
              name="minPrice"
              min={0}
              max={1000}
              placeholder="Min Price"
              onChange={handleChange}
              defaultValue={query.minPrice}
            />
          </div>
          <div className="item">
            <input
              type="number"
              name="maxPrice"
              min={0}
              max={1000}
              placeholder="any"
              onChange={handleChange}
              defaultValue={query.maxPrice}
            />
          </div>
          <div className="item">
            <input
              type="text"
              id="bedroom"
              name="bedroom"
              placeholder="Bedroom"
              onChange={handleChange}
              defaultValue={query.bedroom}
            />
          </div>
          <button onClick={handleFilter}>
            <img src="/search.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
