import React, { useState } from 'react';

const AllPost = ({ post }) => {
    const date = new Date(post.createdAt);
    const writer = post.nick;

    return(
        <div className = 'one'>
        <p className = 'postitle'> {post.title} </p>
        <div className = 'writerntime'>
            {/* <img className = 'wrphoto' src = {profile} width = '30px' height = '30px' alt = {profile} /> */}
            <p>{writer }</p>
            <p className = 'time'> ・{date.getFullYear()}. {date.getMonth()+1}. {date.getDate()} {date.getHours()}:{date.getMinutes()} </p>
        </div>
        { post.photo && <img className = 'postphoto' src={post.photo} width = '200px' height = '200px' alt= {post.photo}/> }
        <p className = 'text'> {post.post}</p>
        <br></br>
        </div>
    );
}

export default AllPost;