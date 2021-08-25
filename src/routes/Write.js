import { dbService } from 'fbase';
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import './Write.css';

const Write = ({ userObj }) => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [attachment, setAttactment] = useState(''); 

    const onChange = (e) => {
        let { target : {name, value} } = e;
        
        if(name === 'title'){ setTitle(value); } 
        else if(name = 'post'){ setPost(value); }
    }
    const onFileChange = (e) => {
        const{ target : { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedE) => {
            const { currentTarget : {result} } = finishedE;
            setAttactment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        await dbService.collection('posts').add({
            title : title,
            post : post,
            photo : attachment,
            createdAt : Date.now(),
            creator : userObj.uid,
            nick : userObj.email
        });

        history.push('/');
    }

    return(
        <>
            <form className = 'writebox' onSubmit = {onSubmit}>
                <input className = 'wtitle'
                    type = 'title'
                    value = {title}
                    name = 'title'
                    onChange = {onChange}
                    placeholder = '제목을 입력하세요'
                    required
                />
                <input className = 'wpost'
                    type = 'post'
                    value = {post}
                    name = 'post'
                    onChange = {onChange}
                    placeholder = '본문을 입력하세요'
                    required
                />
                <input className = 'wphoto' type = 'file' accept = 'image/*' onChange = {onFileChange} />
                <input className = 'finishbutton' type = 'submit' value = '작성' />
                <button className = 'canclebutton' onClick = {() => {history.push('/');}}> 취소 </button>
            </form>
        </>

    );
}

export default Write;