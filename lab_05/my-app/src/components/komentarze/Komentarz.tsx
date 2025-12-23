import { useState } from "react";
import likeImg from "./assets/like.png";
import dislikeImg from "./assets/dislike.png";

const Comment = (props: any) => {

    const [userChoice, setUserChoice] = useState<number>(0);

    const handleUpvote = () => {
        setUserChoice(userChoice === 1 ? 0 : 1);
    };

    const handleDownvote = () => {
        setUserChoice(userChoice === -1 ? 0 : -1);
    };

    const totalLikes = props.likes + userChoice;

    const iconStyle = {
        width: "20px",
        height: "20px",
        cursor: "pointer",
        transition: "transform 0.2s"
    };

    return (
        <div className="comment" style={{ width: "100%", border: "1px solid #ddd", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
            <div className="userInfo">
                <strong>{props.user.fullName}</strong> 
                <span style={{ color: "gray", marginLeft: "5px" }}>@{props.user.username}</span>
            </div>
            
            <p className="body">{props.body}</p>
            
            <div className="likeContainer" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div onClick={handleUpvote} style={{ opacity: userChoice === 1 ? 1 : 0.5 }}>
                    <img src={likeImg} alt="upvote" style={iconStyle} />
                </div>

                <span style={{ 
                    fontWeight: "bold", 
                    color: userChoice === 1 ? "green" : userChoice === -1 ? "red" : "black" 
                }}>
                    {totalLikes}
                </span>

                <div onClick={handleDownvote} style={{ opacity: userChoice === -1 ? 1 : 0.5 }}>
                    <img src={dislikeImg} alt="downvote" style={iconStyle} />
                </div>
            </div>
        </div>
    );
};

export default Comment;