
import { useState } from 'react';
import { addComment } from '../../services/petitionService';
import './comments.css'
//May be add comments context or some other way so that the comment stays in the state all the time
import { generateRandomId } from '../../services/helpers';
export const Comments = ({ user, petitionId, comments }) => {
    const [commentsState, setCommentsState] = useState(comments || []);
    const [newComment, setNewComment] = useState('');
    const [showForm, setShowForm] = useState(true);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            username: `${user.firstName} ${user.lastName}`,
            time: new Date().toLocaleString(),
            comment: newComment,
            _id: generateRandomId(10)
        };
        setCommentsState([...comments, comment]);
        setNewComment('');
        addComment(petitionId, comment);
        setShowForm(false);
    };

    const renderComment = (comment) => {
        return (
            <li key={comment._id} className="comment">
                <div className="comment-header">
                    <div className="comment-username">{comment.username}</div>
                    <div className="comment-time">{comment.time}</div>
                </div>
                <div className="comment-body">{comment.comment}</div>
            </li>
        );
    };

    return (
        <div id="comments-section">
            <h3>Коментари</h3>
            <ul>
                {commentsState.map(renderComment)}
            </ul>
            {showForm
                ? (
                    <form onSubmit={handleCommentSubmit}>
                        <div>
                            <label htmlFor="comment">Оставете коментар:</label>
                            <br />
                            <textarea
                                id="comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={5}
                                cols={50}
                            />
                        </div>
                        <br />

                        {user.username
                            ? <button className="btn-submit-comment" type="submit">Изпрати</button>
                            : <>
                                <span> Трябва да сте логнат за да коментирате</span>
                                <button className="btn-submit-comment" type="submit" disabled>- - - - - - -</button>
                            </>
                        }
                    </form>
                )
                : (<h4> Успешно добавихте коментар</h4>)
            }
        </div>
    );
};

