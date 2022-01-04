import { createContext, useEffect, useState } from "react";
// import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  //   const [feedback, setFeedback] = useState(FeedbackData);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);
  //   Fetch Feedbacks

  const fetchFeedback = async () => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // Delete Item From Feedback
  const deleteFeedback = async (id) => {
    await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "DELETE",
    });
    const updatedFeedbacks = feedback.filter((f) => f.id !== id);
    setFeedback(updatedFeedbacks);
    fetchFeedback();
  };
  // Add Item to Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`http://localhost:5000/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = response.json();
    setFeedback([data, ...feedback]);
    fetchFeedback();
  };
  // Edit Item From Feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // Update Feedback
  const updateFeedback = async (id, newFeedback) => {
    const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    fetchFeedback();
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

// serve -s build
