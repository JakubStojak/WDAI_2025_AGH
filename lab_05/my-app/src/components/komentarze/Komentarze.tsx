import { useState, useEffect } from "react";
import { CommentInt } from "./interfejsy.js";
import Comment from "./Komentarz";

const Komentarze = () => {
	const [comments, setComments] = useState<CommentInt[]>([]);

	useEffect(() => {
		fetch("https://dummyjson.com/comments")
			.then((res: Response) => res.json())
			.then(
				(data: { comments: CommentInt[]; total: number; skip: number; limit: number }) => {
					setComments(data.comments);
				}
			);
	}, []);

	return (
        <>
        <h1>7.2 Komentarze</h1>
		<div className="commentContainer">
			{comments.map((comment: CommentInt) => (
				<Comment
					id={comment.id}
					body={comment.body}
					postId={comment.postId}
					likes={comment.likes}
					user={comment.user}
				/>
			))}
		</div>
        </>
	);
};

export default Komentarze;