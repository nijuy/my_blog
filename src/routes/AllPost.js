import React, { useState } from 'react';
import CommentFactory from './CommentFactory';

const AllPost = ({ userObj, post }) => {
    const date = new Date(post.createdAt);
    const writer = post.nick;
    const [seeComment, setSeeComment] = useState(false);

    return(
        <div className = 'one'>
            <p className = 'postitle'> {post.title} </p>
            <div className = 'writerntime'>
                <p>{writer }</p>
                <p className = 'time'> ・{date.getFullYear()}. {date.getMonth()+1}. {date.getDate()} {date.getHours()}:{date.getMinutes()} </p>
            </div>
            { post.photo && <img className = 'postphoto' src={post.photo} width = '200px' height = '200px' alt= {post.photo}/> }
            <p className = 'text'> {post.post}</p>

            <div className = 'comment'>
                <button onClick = {() => {setSeeComment(prev => !prev)}} type = 'button'> { seeComment ? '댓글창 닫기' : '댓글창 열기'} </button>
                { seeComment && <CommentFactory userObj = {userObj} post = {post} /> }
            </div>
            <br></br>
        </div>
    );
}

export default AllPost;