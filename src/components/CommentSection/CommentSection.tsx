import React, { useState, KeyboardEvent } from "react";
import data from "../../data/data.json";
import "./CommentSection.css";

// Import all images directly
import amyrobsonWebp from "../../assets/avatars/image-amyrobson.webp";
import maxblagunWebp from "../../assets/avatars/image-maxblagun.webp";
import replyIcon from "../../assets/icon-reply.svg";
import minusIcon from "../../assets/icon-minus.svg";
import plusIcon from "../../assets/icon-plus.svg";
// Import other avatar images as needed

// Create an object to map usernames to their respective images
const avatarImages: { [key: string]: string } = {
  amyrobson: amyrobsonWebp,
  maxblagun: maxblagunWebp,
  // Add other usernames and their corresponding imported images here
};

// Define the Comment interface
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: Comment[];
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(
    data.comments as Comment[],
  );

  const handleScoreChange = (id: number, increment: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, score: Math.max(0, comment.score + increment) }
          : comment,
      ),
    );
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: number,
    increment: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleScoreChange(id, increment);
    }
  };

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-section__comment">
          <div className="comment-section__header">
            <img
              className="comment-section__avatar"
              src={
                avatarImages[comment.user.username] || comment.user.image.webp
              }
              alt={comment.user.username}
            />
            <p className="comment-section__username">{comment.user.username}</p>
            <p className="comment-section__created-at">{comment.createdAt}</p>
          </div>
          <p className="comment-section__content">{comment.content}</p>
          <div className="comment-section__footer">
            <div className="comment-section__score-container">
              <button
                className="comment-section__score-btn"
                onClick={() => handleScoreChange(comment.id, 1)}
                onKeyDown={(e) => handleKeyDown(e, comment.id, 1)}
                aria-label="Increase score"
              >
                {plusIcon ? (
                  <img src={plusIcon} alt="Plus" />
                ) : (
                  <span aria-hidden="true">+</span>
                )}
              </button>
              <span className="comment-section__score">{comment.score}</span>
              <button
                className="comment-section__score-btn"
                onClick={() => handleScoreChange(comment.id, -1)}
                onKeyDown={(e) => handleKeyDown(e, comment.id, -1)}
                aria-label="Decrease score"
              >
                {minusIcon ? (
                  <img src={minusIcon} alt="Minus" />
                ) : (
                  <span aria-hidden="true">-</span>
                )}
              </button>
            </div>

            <button className="comment-section__reply-btn">
              <img src={replyIcon} alt="Reply" />
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
