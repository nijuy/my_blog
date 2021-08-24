import React, { useState } from 'react';
import './PostList.css';

const PostList = ({ title, createdAt, edit }) =>{
    const date = new Date(createdAt);
    const [checked, setChecked] = useState(false);

    return(
        <div>
            <div className = 'titleNtime'>
                <p className = 'Title'> 
                    { edit && 
                        <button className = 'editcheck' onClick = {() => { setChecked(prev => !prev); }}> 
                            { checked ? '🔳' : '⬜' } 
                        </button>
                    } 
                    {title}
                </p> 
                <p className = 'Time'>{date.getFullYear()}.{date.getMonth()+1}.{date.getDate()}</p>
            </div>
        </div>
    );
}

export default PostList;