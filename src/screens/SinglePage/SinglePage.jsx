import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import "./singlepage.scss";
import Slider from "../../components/slider/Slider";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import PostDetails from "../../components/PostDetails/PostDetails";
import FeatureList from "../../components/FeatureList/FeatureList";
import { fetchSinglePost, savePostById } from "../../services/postServices";
import {
  createChat,
  fetchAllChats,
  sendMessage,
} from "../../services/chatServices";
import { showToast } from "../../components/toast/Toast";

Modal.setAppElement("#root");

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const abortController = new AbortController();

    // Fetch data using the ID
    const fetchData = async () => {
      try {
        const result = await fetchSinglePost(id, {
          signal: abortController.signal,
        });
        setData(result.data);
        setSaved(result.isSaved);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort(); // Cleanup function
  }, [id]); // Dependency on `id` ensures the effect runs when ID changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const savePostHandler = async () => {
    const currentSavedState = saved;
    setSaved(!currentSavedState);
    if (!currentUser) {
      navigate("/login");
    }

    try {
      const response = await savePostById(id);
      if (!response.error) {
        showToast(response.message, "success");
      }
    } catch (error) {
      setSaved(currentSavedState);
      console.log(error);
    }
  };

  // Helper function to find an object ID based on user IDs
  function findObjectIdWithUserIds(data, id1, id2) {
    if (!Array.isArray(data)) return null; // Return null if data is invalid

    return (
      data.find(
        (item) => item?.userIDs?.includes(id1) && item?.userIDs?.includes(id2)
      )?.id || null
    ); // Return the object's ID or null if not found
  }

  // Main function to handle sending a message
  const handleSendMessage = async () => {
    try {
      const chatsData = await fetchAllChats();

      // Find matching chat ID
      const matchingId = findObjectIdWithUserIds(
        chatsData.data,
        currentUser.id,
        data.userId
      );

      if (matchingId) {
        // Send the message to the existing chat
        const messageData = await sendMessage(matchingId, message);
        if (!messageData.error) {
          showToast(messageData.message, "success");
        }
      } else {
        // Create a new chat and send the message
        const createChatData = await createChat(data?.userId);

        const newMatchingId = findObjectIdWithUserIds(
          createChatData.data,
          currentUser.id,
          data.userId
        );

        if (newMatchingId) {
          const messageData = await sendMessage(newMatchingId, message);
          if (!messageData.error) {
            showToast(messageData.message, "success");
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error); // Handle error properly
      showToast("Message Failed!", "error");
    } finally {
      closeModal(); // Close modal after sending
    }
  };

  return (
    <>
      <div className="singleContainer">
        <div className="details">
          <div className="wrapper">
            <Slider images={data.images} />
            <PostDetails data={data} />
          </div>
        </div>
        <div className="features">
          <FeatureList data={data} />
          {currentUser.id !== data.userId && (
            <div className="buttons">
              <button onClick={openModal}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button
                onClick={savePostHandler}
                style={{ backgroundColor: saved ? "#fece51" : "white" }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
            </div>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal" // Apply SCSS class
          overlayClassName="modal-overlay" // Apply SCSS class
          contentLabel="Example Modal" //Accessibility label
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="modal-textarea" // Add class for styling
            />
            <button type="submit">Send Message</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default SinglePage;
