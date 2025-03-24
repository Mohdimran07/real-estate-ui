import React, { useEffect, useState } from "react";
import "./list.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import { useLocation } from "react-router";
import { getAllPosts } from "../../services/postServices";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const parseQueryParams = () => {
    return Object.fromEntries(new URLSearchParams(location.search));
  };

  const query = parseQueryParams();

  const getPosts = async () => {
    const queryString = new URLSearchParams(query).toString();

    setLoading(true);
    setError(null);
    try {
      const result = await getAllPosts(queryString);
      setData(result.data || []);
    } catch (error) {
      setError("Failed to load data. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [location.search]);

  return (
    <div className="listPage">
      <div className="listContainer">
        <Filter />
        {loading && <p className="loader">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && data.length === 0 && <p>No data found!</p>}
        <div className="wrapper">
          {!loading &&
            !error &&
            data.map((item) => <Card key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default List;
