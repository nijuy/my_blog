import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import Post from './Post';
import './Home.css';

const Home = ({ userObj }) => {
    const [name, setName] = useState(userObj.displayName);
    const [photo] = useState(userObj.photoURL);
    const [listing, setListing] = useState(false);
    const [listEdit, setListEdit] = useState(true);
    const [titles, setTitles] = useState([]);
    const date = new Date();
    
    useEffect(() => {
        dbService.collection('posts').onSnapshot((s) => {
            let postArray = s.docs.map((d) => ({id : d.id, creator : d.creator , ...d.data()}));
            postArray = postArray.filter(i => i.creator === userObj.uid);
            postArray.sort(function(a, b) { return b.createdAt - a.createdAt; });
            // postArray.sort((a,b) => {return b.createdAt - a.createdAt});
            
            setTitles(postArray);
        })
    }, []);

   
    if(name === null){ setName('user'); }
    
    return(
        <section className = 'entire'>
            <div>
                <div className = 'profilebox'>
                    <img src = {photo} width = '161px' height = '184px' alt = {photo}/>
                    <div className = 'nick'>
                        <strong> {name} </strong>
                        <h5 className = 'email'> ({userObj.email}) </h5>
                    </div>
                    <h6 className = 'profilebutton'><Link to ='/profile'> 블로그관리 </Link></h6>
                    <h6 className = 'writebutton'><Link to ='/write'> 글쓰기 </Link></h6>
                </div>
                <p className = 'timetotd'><Link to ='/todo'> { date.getHours() }:{ date.getMinutes() } </Link></p>
            </div>

            <div className = 'rightbox'>
                <div className = 'listbox'>
                    <button className = 'listbutton' onClick = {() => { 
                        setListing(prev => !prev); 
                        setListEdit(prev => !prev);
                    }}> 
                        { listing ? '목록 닫기' : '목록 열기' } 
                    </button>
                    <p className = 'postcount'>・ { titles.length }개의 글</p>
                </div>
                <div className = 'list'>
                    { listing &&
                        (titles.map(t => 
                            <PostList key = {t.createdAt} createdAt = {t.createdAt} title = {t.title} edit = {listEdit}/>
                    ))}
                    { listing && 
                        <button className = 'editbutton' onClick = {() => { setListEdit(prev => !prev); }}> 
                            { listEdit ? '글관리 닫기 ' : '글관리 열기' }
                        </button>
                    }
                </div>
                <br></br>
                <div className = 'posts'> { titles.map((p) => (<Post key = {p.createdAt} post = {p} userObj = {userObj} />))} </div>  
            </div>      
        </section>
    );
};

export default Home;