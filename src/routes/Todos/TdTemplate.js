import React from 'react';
import './TdTemplate.css';

const TdTemplate = ({ form, children }) => {
    return(
        <div className = "tdtemplate">
                <section className = "form-wrapper">
                    { form }
                </section>

                <section className = "todo">
                    { children }
                </section>
        </div>
    );
}

export default TdTemplate;
