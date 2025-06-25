import React from 'react';
import './NewQuestion.css';

const NewQuestion = (props) => {
    const { id, x, question, updateQuestion, deleteQuestion } = props;

    const handleChange = (field, value) => {
        updateQuestion(id, { ...question, [field]: value });
    };

    return (
        <div className="question-container">
            <div className="question-header">
                <h2>Question {x}</h2>
                <button  type="button" onClick={() => deleteQuestion(id)}>Delete Question</button>
            </div>
            <div className="question-form">
                <div className="input-group">
                    <label htmlFor="EngQuestion">English Question</label>
                    <input
                        type="text"
                        id="EngQuestion"
                        name="EngQuestion"
                        value={question.engQuestion|| ''}
                        onChange={(e) => handleChange('engQuestion', e.target.value)}
                        placeholder="Enter question in English"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="FrQuestion">French Question</label>
                    <input
                        type="text"
                        id="FrQuestion"
                        name="FrenchQuestion"
                        value={question.frenchQuestion || ''}
                        onChange={(e) => handleChange('frenchQuestion', e.target.value)}
                        placeholder="Entrez la question en français"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="AnswerFormat">Answer Format</label>
                    <select
                        id="AnswerFormat"
                        name="AnsFormat"
                        value={question.answerFormat}
                        onChange={(e) => handleChange('answerFormat', e.target.value)}
                    >
                        <option value="text">Text</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="checkbox">Checkbox</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default NewQuestion;