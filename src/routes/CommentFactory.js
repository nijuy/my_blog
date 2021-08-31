import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import './CommentFactory.css';
import Comment from './Comment';

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
            creatorId : userObj.uid,
            img : userObj.photoURL,
            text : comment,
            createdAt : Date.now()
        });

        setComment('');
    }

    const onChange = (e) => {
        const { target : {value} } = e;
        setComment(value);
    }

    return(
        <div className = 'commentbox'>
            { comments.map((c) => <Comment c = {c} post = {post} isOwner = {userObj.uid === c.creatorId}/>)}

            <div> {comments.length === 0 ? <></> : <><br/><br/></>} </div>
            
            <form className = 'cbox' onSubmit = {onSubmit}>
                <div className = 'cwriter'>
                    <img className = 'cwp' src = {userObj.photoURL} alt = {userObj.photoURL} width = '23px' height = '23px' /> 
                    <h6> {userObj.displayName} </h6>
                </div>
                <input className = 'wcomment'
                    onChange = {onChange}
                    value = {comment}
                    placeholder = '댓글을 입력하세요.'
                    required
                />
                <input className = 'commentbutton' type = 'submit' value = '등록' />
            </form>
        </div>
    );
}

export default CommentFactory;