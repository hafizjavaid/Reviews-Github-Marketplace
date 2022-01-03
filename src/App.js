import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import "./index.css";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const handleDelete = (id) => {
    const updatedFeedback = feedback.filter((f) => f.id !== id);
    setFeedback(updatedFeedback);
  };
  const addFeedback = (newFeedback) => {
    setFeedback([newFeedback, ...feedback]);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <FeedbackForm addFeedback={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
