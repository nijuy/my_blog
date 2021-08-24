import { dbService } from 'fbase';
import React, { useState } from 'react';
import './Post.css';

const Post = ({ post, userObj }) => {
    const date = new Date(post.createdAt);
    const [name, setName] = useState(userObj.displayName);

    const onDeleteClick = async () => {
        const ok = window.confirm(`삭제한 글은 복구가 불가능합니다.\n글을 삭제하시겠습니까?`);
        if (ok) { await dbService.doc(`posts/${post.id}`).delete(); }
    }

    if(name === null){ setName('user'); }

    return(
        <div>
            <div className = 'one'>
                    <p className = 'postitle'> {post.title} </p>
                    <div className = 'writerntime'> 
                        <p>{name }</p>
                        <p className = 'time'> ・{date.getFullYear()}. {date.getMonth()+1}. {date.getDate()} {date.getHours()}:{date.getMinutes()} </p>
                    </div>
                    { post.photo && <img src={post.photo} width = '200px' height = '200px' alt= {post.photo}/> }
                    <p className = 'text'> {post.post}</p>
                    <div className = 'buttons'>
                            <button className = 'editNdelete'> 수정 </button>
                            <button className = 'editNdelete' onClick = {onDeleteClick}> 삭제 </button>
                    </div>
                    <br></br>
            </div>
        </div>
        
    );
}

export default Post;