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
                <p> π‘ </p>
                <h6> 
                    νμμ λ€λ₯Έ μ΄μ©μλ€μ΄ μ΄ κΈμ μ½κ³ ,
                    λ§μμ λλ κΈμ λκΈμ λ¬μλ³΄μΈμ! <br/>
                    <br/>(λΉλ°κΈλ‘ μμ±ν ν¬μ€νΈλ λΈλ‘κ·Έ νμ λΈμΆλμ§ μμ΅λλ€.) 
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