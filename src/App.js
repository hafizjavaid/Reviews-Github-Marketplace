import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import "./index.css";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const handleDelete = (id) => {
    const updatedFeedback = feedback.filter((f) => f.id !== id);
    setFeedback(updatedFeedback);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
