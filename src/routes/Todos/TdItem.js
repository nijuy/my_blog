import React, { Component } from 'react';
import './TdItem.css';

class TdItem extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }

    render(){
        const { text, checked, id, onToggle, onRemove } = this.props;
 
        return(
            <div className = "todo-item" onClick = {() => onToggle(id)}>
                <div className = "remove" onClick = {(e) => {
                    e.stopPropagation();
                    onRemove(id); 
                }}>
                    &times;
                </div>
                    
                <div className = 'todo-text'>
                    <div> { text } </div>
                </div>

                 { checked && (<div className="check-mark"> ✓ </div>) }

            </div>
        );
    }
}

export default TdItem;