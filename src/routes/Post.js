import { dbService } from 'fbase';
import React, { useState } from 'react';
import './Post.css';

const Post = ({ post, userObj }) => {
    const date = new Date(post.createdAt);
    const [nick, setNick] = useState(userObj.displayName);
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(post.title);
    const [newPost, setNewPost] = useState(post.post);

    const onDeleteClick = async () => {
        const ok = window.confirm(`삭제한 글은 복구가 불가능합니다.\n글을 삭제하시겠습니까?`);
        if (ok) { await dbService.doc(`posts/${post.id}`).delete(); }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev);
    }
    const onChange = (e) => {
        const{ target : {name, value} } = e;

        if(name === 'title') { setNewTitle(value); }
        else if (name === 'post') { setNewPost(value); }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dbService.doc(`posts/${post.id}`).update({
            title : newTitle,
            post : newPost
        });
        setEditing(false);
    }

    if(nick === null){ setNick('user'); }

    return(
        <div>
            { editing ? (
                <div className = 'editboxx'>
                    <form className = 'editing' onSubmit = {onSubmit}> 
                        <input className = 'titlebox'
                            name = 'title'
                            type='title' 
                            placeholder = "새 제목" 
                            value = {newTitle}
                            onChange = {onChange}
                            required
                        />
                        <div className = 'writerntime'> 
                            <p>{nick }</p>
                            <p className = 'time'> ・{date.getFullYear()}. {date.getMonth()+1}. {date.getDate()} {date.getHours()}:{date.getMinutes()} </p>
                        </div>
                        <input className = 'postbox'
                            name = 'post'
                            type='post' 
                            placeholder = "새 본문" 
                            value = {newPost} 
                            onChange = {onChange}
                            required
                        /> 
                        <input className = 'ebutton' type='submit' value = '수정' />
                        <button className = 'ecbutton' onClick = {toggleEditing}> 취소 </button>
                    </form>
                </div>    
                ) :
                <div className = 'one'>
                    <p className = 'postitle'> {post.title} </p>
                    <div className = 'writerntime'> 
                        <p>{nick }</p>
                        <p className = 'time'> ・{date.getFullYear()}. {date.getMonth()+1}. {date.getDate()} {date.getHours()}:{date.getMinutes()} </p>
                    </div>
                    { post.photo && <img src={post.photo} width = '200px' height = '200px' alt= {post.photo}/> }
                    <p className = 'text'> {post.post}</p>
                    <div className = 'buttons'>
                            <button className = 'editNdelete' onClick = {toggleEditing}> 수정 </button>
                            <button className = 'editNdelete' onClick = {onDeleteClick}> 삭제 </button>
                    </div>
                    <br></br>
                </div> 
            }
            
        </div>
        
    );
}

export default Post;