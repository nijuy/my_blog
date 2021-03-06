import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import './Blogs.css';
import AllPost from './AllPost';

const Blogs = ({ userObj }) => {
    const [allpost, setAllPost] = useState([]);
    useEffect(() => {
        dbService.collection('posts').onSnapshot((s) => {
            let postArray = s.docs.map((d) => ({id : d.id, creator : d.creator , ...d.data()}));
            postArray.sort(function(a, b) { return b.createdAt - a.createdAt; });
            postArray = postArray.filter(i => i.secret === false);
            setAllPost(postArray);
        })
    }, []);

    return(
        <div className = 'eeentire'>
            <div className = 'atext'>
                <p> 🏡 </p>
                <h6> 
                    홈에서 다른 이용자들이 쓴 글을 읽고,
                    마음에 드는 글에 댓글을 달아보세요! <br/>
                    <br/>(비밀글로 작성한 포스트는 블로그 홈에 노출되지 않습니다.) 
                </h6>
            </div>
            <br></br>
            <div className = 'allpost'> 
                { allpost.map(p => <AllPost userObj = {userObj} post = {p}/> )} 
            </div>  
        </div>
    );
}

export default Blogs;