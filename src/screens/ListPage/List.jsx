import React, { useEffect, useState } from "react";
import "./list.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLocation } from "react-router";
import { BASE_URL } from "../../constants";

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
    const url = `${BASE_URL}/posts?${queryString}`;
    console.log(url);

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/posts?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
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
        {/* <div className="wrapper"> */}
        <Filter />
        {loading && <p className="loader">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && data.length === 0 && <p>No data found!</p>}
        <div className="wrapper">
          {!loading && !error && (
            data.map((item) => <Card key={item.id} item={item} />)
            // <>
            //   <Card />
            //   <Card />
            //   <Card />
            //   <Card />
            //   <Card />
            //   <Card />
            //   <Card />
            // </>
          )}
        </div>

        {/* </div> */}
      </div>
      {/* <div className="mapContainer">
        {!loading && !error && <Map items={data} />}
      </div> */}
    </div>
  );
};

export default List;
