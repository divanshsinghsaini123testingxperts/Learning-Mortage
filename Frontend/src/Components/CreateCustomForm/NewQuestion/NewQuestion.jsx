import { React } from 'react';

const NewQuestion = (props) => {
    const { id, x, question, updateQuestion  , deleteQuestion } = props;

    // Directly update parent array on change
    const handleChange = (field, value) => {
        updateQuestion(id, { ...question, [field]: value });
    };

    return (
        <>
            <h2>Question {x}</h2>
            <button onClick={deleteQuestion}>del</button>
            <div>
                <label htmlFor="EngQuestion">English Question</label>
                <input
                    type="text"
                    id="EngQuestion"
                    name="EngQuestion"
                    value={question.engQuestion}
                    onChange={(e) => handleChange('engQuestion', e.target.value)}
                />
                <label htmlFor="FrQuestion">French Question</label>
                <input
                    type="text"
                    id="FrQuestion"
                    name="FrenchQuestion"
                    value={question.frQuestion}
                    onChange={(e) => handleChange('frQuestion', e.target.value)}
                />
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
        </>
    );
};

export default NewQuestion;