import React from 'react';
import { Answer } from './index';

const AnswersList = (props) => {
    const {answers,select} = props;
    return (
        <div className="c-grid__answer">
            {answers.map((value,index)=>{
                return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={select}/>
            })}
        </div>
    );
};

export default AnswersList;
