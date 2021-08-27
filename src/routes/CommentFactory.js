import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import './CommentFactory.css';

const CommentFactory = ({ userObj, post }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        dbService.doc(`posts/${post.id}`).collection('comments').onSnapshot((s) => {
            const commentArray = s.docs.map((d) => ({ id : d.id, creator : d.creator , ...d.data()}));
            commentArray.sort(function(a, b) { return a.createdAt - b.createdAt; });
            setComments(commentArray);
        });
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        const thispost = dbService.collection('posts').doc(`${post.id}`);
        await thispost.collection('comments').add({
            creator : userObj.displayName,
            text : comment,
            createdAt : Date.now()
        });
    }
    const onChange = (e) => {
        const { target : {value} } = e;
        setComment(value);
    }

    return(
        <div className = 'commentbox'>
            { comments.map((c) => ( <h6> {c.text} </h6> ))}

            <form className = 'cbox' onSubmit = {onSubmit}>
                <div className = 'cwriter'>
                    <img className = 'cwp' src = {userObj.photoURL} alt = {userObj.photoURL} width = '23px' height = '23px' /> 
                    <h6> {userObj.displayName} </h6>
                </div>
                <input className = 'wcomment'
                    onChange = {onChange}
                    placeholder = '댓글을 입력하세요.'
                    required
                />
                <input className = 'commentbutton' type = 'submit' value = '등록' />
            </form>
        </div>
    );
}

export default CommentFactory;