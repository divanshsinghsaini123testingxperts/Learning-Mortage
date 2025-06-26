import React, { useEffect } from 'react';
import './NewQuestion.css';

const NewQuestion = (props) => {
  const { id, x, question, updateQuestion, deleteQuestion } = props;

  const handleChange = (field, value) => {
    updateQuestion(id, { ...question, [field]: value });
  };

//   // Auto-translate when engQuestion changes
//   useEffect(() => {
//     if (!question.engQuestion || question.engQuestion.trim() === "") return;

//     const body = {
//       text: question.engQuestion,
//       sourceLang: "en",
//       targetLang: "fr"
//     };

//     fetch(`https://localhost:7294/api/CustomForms`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body)
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         updateQuestion(id, { ...question, frenchQuestion: data.translated });
//         console.log("Auto-translated:", data.translated);
//       })
//       .catch((err) => {
//         console.error("Translation failed:", err);
//       });
//   }, [question.engQuestion]); // Triggers on every engQuestion change

  return (
    <div className="question-container">
      <div className="question-header">
        <h2>Question {x}</h2>
        <button type="button" onClick={() => deleteQuestion(id)}>Delete Question</button>
      </div>
      <div className="question-form">
        <div className="input-group">
          <label htmlFor={`EngQuestion-${id}`}>English Question</label>
          <input
            type="text"
            id={`EngQuestion-${id}`}
            value={question.engQuestion || ''}
            onChange={(e) => handleChange('engQuestion', e.target.value)}
            placeholder="Enter question in English"
          />
        </div>
        <div className="input-group">
          <label htmlFor={`FrQuestion-${id}`}>French Question</label>
          <input
            type="text"
            id={`FrQuestion-${id}`}
            value={question.frenchQuestion || ''}
            onChange={(e) => handleChange('frenchQuestion', e.target.value)}
            placeholder="Entrez la question en français"
          />
        </div>
        <div className="input-group">
          <label htmlFor={`AnswerFormat-${id}`}>Answer Format</label>
          <select
            id={`AnswerFormat-${id}`}
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
