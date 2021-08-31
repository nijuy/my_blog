import { dbService } from 'fbase';
import React, { useState } from 'react';

const Comment = ({ c, post, isOwner }) => {
    const date = new Date(c.createdAt);
    const [editcomment, setEditComment] = useState(false);

    const togglecomment = () => {
        setEditComment(prev => !prev);
    }

    const onDelete = async () => {
        await dbService.doc(`posts/${post.id}/comments/${c.id}`).delete();
        setEditComment(false);
    }

    return(
        <div className = 'onecomment'>
            <div className = 'cwriter'>
                <img className = 'cwp' src = {c.img} width = '23px' height = '23px' alt = {c.img} />
                <h6> {c.creator} </h6>
                { isOwner && <button className = 'plusbutton' type = 'button' onClick = {togglecomment}> ⋮ </button> }
            </div>
            <div> 
                { editcomment && <button className = 'deletecomment' onClick = {onDelete}> 삭제 </button> } 
            </div>
            
            <div>
                <h6 className = 'c_content'> 
                    {c.text} <br/><br/>
                    {date.getFullYear()}. {date.getMonth()+1}. {date.getDate()} {date.getHours()}:{date.getMinutes()}
                </h6>    
            </div>    
        </div>
    );
}

export default Comment;