import React, {useState} from 'react';
import { authService } from "fbase";
import './Auth.css';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const [manual, setManual] = useState(false);

    const onChange = (e) => {
        const{target : { name, value }} = e;
        
        if(name === 'email') { setEmail(value); } 
        else if(name === 'pw') { setPw(value); }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let data;
            console.log(data);
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, pw);
            }
            else {
                data = await authService.signInWithEmailAndPassword(email, pw);
            }

        } catch(error){
            setError(error.message);
        } 
    }

    const toggleAccount = () => { setNewAccount((prev) => !prev); }

    return(
        <>
            <form className = 'loginbox' onSubmit = {onSubmit}>
                <p className = 'ltext'>
                    My_Blog<br></br>
                    LOGIN 
                </p>
                <input className = 'inputbox'
                    name = 'email'
                    type = 'email'
                    placeholder = '이메일을 입력해주세요'
                    required
                    value = {email}
                    onChange = {onChange}
                />
                <input className = 'inputbox'
                    name = 'pw'
                    type = 'pw'
                    placeholder = '비밀번호를 입력해주세요'
                    required
                    value = {pw}
                    onChange = {onChange}
                />
                { error }
                <input className = 'lbutton' type='submit' value = { newAccount ? '시작하기' :'로그인'} />
                <span className = 'ctext' onClick = {toggleAccount}> { newAccount ? "이미 계정이 있다면?" : "계정 만들기" } </span>
            </form>

            <div className = 'manual'>
                <button className = 'mbutton' onClick = {()=> {setManual(prev => !prev)}}> { manual ? '설명서 닫기' : '설명서 열기'} </button>
                { manual && (
                    <p className = 'exp'>
                        마이 블로그 설명서 💭<br/>
                        <br/>1️⃣ 계정 생성 후 프로필을 설정해주세요<br/>
                        (user는 초기 닉네임입니다.)<br/>
                        (프로필 설정 : 홈 화면 왼쪽 프로필 박스의 '블로그관리' 버튼)<br/>

                        <br/>2️⃣ 홈 화면 프로필 박스 아래 시계를 누르면 투두로 이동합니다<br/>
                        하루 일정을 마이 블로그에 기록해보세요 (❁´◡`❁)<br/>

                        <br/>3️⃣ 블로그 홈에서는 다른 이용자들이 쓴 글을 볼 수 있어요<br/>
                        단, 홈에서 보이는 글은 본인의 글이라도 수정 및 삭제가 불가합니다.<br/>
                        수정/삭제는 '내 블로그' 에서 해주세요!<br/>
                    </p>
                )}
            </div>
        </>
    );
};

export default Auth;