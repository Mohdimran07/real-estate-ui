import React, { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "./singlepage.scss";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import Map from "../../components/map/Map";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using the ID
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result.data);
        setData(result.data);
        setSaved(result.isSaved);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Dependency on `id` ensures the effect runs when ID changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const savePostHandler = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }

    try {
      await fetch(`${BASE_URL}/user/save`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ postId: id }),
      });
    } catch (error) {
      setSaved((prev) => !prev);
      console.log(error);
    }
  };

  // const data = singlePostData;
  return (
    <div className="singleContainer">
      <div className="details">
        <div className="wrapper">
          <Slider images={data.images} />
          <div className="info-section">
            <div className="top-section">
              <div className="post">
                <h1>{data.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="location" />
                  <span>{data.address}</span>
                </div>
                <div className="price">₹ {data.price}</div>
              </div>
              <div className="user">
                <img src={data.user.avatar || "/noavatar.jpg"} alt="" />
                <span>{data.user.name}</span>
              </div>
            </div>
            <div
              className="bottom-section"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.PostDetail?.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {data.PostDetail?.utilies === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {data.PostDetail?.pet === "allowed" ? (
                  <p>Pets allowed</p>
                ) : (
                  <p>Pets not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{data.PostDetail?.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{data.PostDetail?.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{data.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{data.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Near by places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{data.PostDetail?.school} m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{data.PostDetail?.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{data.PostDetail?.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title"></p>
          {/* <div className="mapContainer">
            <Map items={[data]} />
          </div> */}
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={savePostHandler}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              {/* {saved ? <img src="/saved.png" alt="" /> : <img src="/save.png" alt="" />} */}
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
