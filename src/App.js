import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutIconLink from "./shared/AboutIconLink";
import AboutPage from "./pages/AboutPage";

import FeedbackData from "./data/FeedbackData";
import "./index.css";
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
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm addFeedback={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    handleDelete={handleDelete}
                  />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />}></Route>
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </div>
  );
}

export default App;
