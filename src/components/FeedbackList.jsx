import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackContext from "../context/FeedbackContext";
import { useContext } from "react";
function FeedbackList() {
  const context = useContext(FeedbackContext);
  const { feedback, isLoading } = context;
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>;
  }
  return isLoading ? (
    <h3>Loading ....</h3>
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={i} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;
