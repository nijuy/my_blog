import { authService, dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './Profile.css';

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newName, setNewName] = useState(userObj.displayName);
    const [photo, setPhoto] = useState(userObj.photoURL);
    const [pbutton, setPbutton] = useState(false);
    const [cbutton, setCbutton] = useState(false);
    const [mypost, setMyPost] = useState([]);

    useEffect(() => {
        dbService.collection('posts').onSnapshot((s) => {
            let postArray = s.docs.map((d) => ({id : d.id, creator : d.creator , ...d.data()}));
            postArray = postArray.filter(i => i.creator === userObj.uid);
            setMyPost(postArray);
        })
    }, []);
    const onSubmit = async (e) => {
        let fileURL = '';

        e.preventDefault();
        if(userObj.photoURL !== photo){
            const fileRef = storageService.ref().child(`${userObj.uid}/photo`);
            const response = await fileRef.putString(photo, "data_url");
            fileURL = await response.ref.getDownloadURL();
            
            await userObj.updateProfile({ photoURL : fileURL });
            refreshUser();
        }
        if(userObj.displayName !== newName) {
            await userObj.updateProfile({ displayName : newName });
            refreshUser();
        }

        history.push('/');
    }
    const onChange = (e) => {
        const { target : {value} } = e;
        setNewName(value);
    }
    const onFileChange = (e) => {
        const{ target : { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedE) => {
            const { currentTarget : {result} } = finishedE;
            setPhoto(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onDelete = async () => {
        const ok = window.confirm(`진짜 삭제하시겠습니까?\n(확인을 누르면 로그인 화면,\n취소를 누르면 내 블로그 홈으로 이동합니다)`);
        if(ok) {
            await mypost.map((post) => { dbService.doc(`posts/${post.id}`).delete(); });
            const user = authService.currentUser;
            user.delete().then(() => {
                authService.delete();
            })
        } 
        history.push('/');     
    }
    
    return(
        <section className = 'boxes'> 
            <div className = 'pbutton'>
                <button className = 'b' onClick = {() => { setPbutton(prev => !prev); }}> 프로필 </button>
                { pbutton &&
                    <div className = 'eentire'>
                        <form className = 'editbox' onSubmit = {onSubmit}>
                            <img className = 'image' src = {photo} width = '161px' height = '184px' alt={photo} />
                            <input className = 'image-upload'
                                type = 'file'
                                accept = 'image/*'
                                onChange = {onFileChange}
                            />
                            <input className = 'newnick'
                                type = 'newName'
                                value = {newName}
                                placeholder = '새 닉네임을 입력하세요'
                                onChange = {onChange}
                            /> 
                            <input className = 'newprofile' type = 'submit' value = '수정' />
                            <button className = 'cancleprofile' onClick = {() => { setPbutton(prev => !prev); } }> 취소 </button>
                        </form>
                    </div>}       
                
            </div>

            <div className = 'cbutton'>
                <button className = 'c' onClick = {() => { setCbutton(prev => !prev); }}> 회원 탈퇴 </button>
                { cbutton && 
                    <div>
                        <form className = 'editbox'>
                            <p className = 'deletext'>
                                ( 현재 로그인 중인 계정 : {userObj.email} )<br/><br/>
                                회원 탈퇴시 작성한 글은 모두 삭제되며,<br/>
                                삭제된 블로그는 복구가 불가능합니다.<br/>
                                정말 삭제하시겠습니까?<br/>
                            </p>
                            <button className = 'deleteblog' onClick = {() => { onDelete(); }}> 확인 </button>
                            <button className = 'cancledelete' onClick = {() => { setCbutton(prev => !prev); } }> 취소 </button>
                        </form>
                    </div>}
            </div>
        </section>
    );
};

export default Profile;