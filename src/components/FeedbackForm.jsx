import { useContext, useEffect, useState } from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  //
  const [rating, setRating] = useState(10);

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  useEffect(() => {
    if (!feedbackEdit.edit) return;
    setBtnDisabled(false);
    setText(feedbackEdit.item.text);
  }, [feedbackEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(text !== "" && text.trim().length >= 10)) return;
    const newFeedback = {
      text,
      rating,
    };
    // if (feedbackEdit.edit) {
    //   updateFeedback(feedbackEdit.item.id, newFeedback);
    // } else {
    //   addFeedback(newFeedback);
    // }
    feedbackEdit.edit
      ? updateFeedback(feedbackEdit.item.id, newFeedback)
      : addFeedback(newFeedback);
    setText("");
    setBtnDisabled(true);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        {/* @todo - rating select component */}
        {/* Select is a function and passed as props and it is triggered when we call handle change */}
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
