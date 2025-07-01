import React from 'react';
import './Question.css';

function Question(props) {
  const { idx, question , setFormResponse , formResponse} = props;

  return (
    <div className="question-card">
      <div className="question-title">Q{idx + 1}</div>
      <div className="question-title">English: {question.engQuestion}</div>
      <div className="question-title">French: {question.frenchQuestion}</div>
      {question.answerFormat === 'text' && (
        <input
          type="text"
          value={formResponse[idx] || ''}
          onChange={e => {
            const newResponse = [...formResponse];
            newResponse[idx] = e.target.value;
            setFormResponse(newResponse);
          }}
        />
      )}
      {/* now work for options and checkboxes  */}
      {question.answerFormat === 'multiple-choice' && (
        <select
          value={formResponse[idx] || ''}
          onChange={e => {
            const newResponse = [...formResponse];
            newResponse[idx] = e.target.value;
            setFormResponse(newResponse);
          }}
        >
          <option value="">-- Please select an option --</option>
          {question.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {/* now we are looking for checkboxes */}
      {question.answerFormat === 'checkbox' && (
        <div className="question-options">
          {question.options.map((option, index) => (
            <label className="question-option-label" key={index}>
              <input
                type="checkbox"
                checked={formResponse[idx]?.includes(option) || false}
                onChange={e => {
                  const newResponse = [...formResponse];
                  if (e.target.checked) {
                    newResponse[idx] = [...(newResponse[idx] || []), option];
                  } else {
                    newResponse[idx] = (newResponse[idx] || []).filter(opt => opt !== option);
                  }
                  setFormResponse(newResponse);
                }}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Question;
