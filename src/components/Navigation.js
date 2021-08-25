import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const history = useHistory();

    return(
        <nav>
            <ul className = 'menu'>
                <li><button className = 'button' onClick = {() => { history.push('/allblog');}}> 블로그 홈 </button></li>
                <li><button className = 'button' onClick = {() => { history.push('/');}}> 내 블로그 </button> </li>
                <li><button className = 'button' onClick = {() => {
                    authService.signOut();
                    history.push('/');
                }}> 로그아웃 </button></li>
            </ul>
        </nav>
    );
}

export default Navigation;
