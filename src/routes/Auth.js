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
                        블로그에서 할 수 있는 일 <br/>
                        1. 뭐뭐<br/>
                        2. 무뭐뭠<br/>
                        3. 뭐뭐뭐<br/>
                        아무튼 나중에 채우기........................... 
                    </p>
                )}
            </div>
        </>
    );
};

export default Auth;