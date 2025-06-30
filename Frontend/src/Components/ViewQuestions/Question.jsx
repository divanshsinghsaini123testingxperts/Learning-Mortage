import React from 'react';

function Question(props) {
  const { idx, question , setFormResponse , formResponse} = props;

  return (
    <div>
      
      <p>Q{idx + 1}</p>
      <p>English: {question.engQuestion}</p>
      <p>French: {question.frenchQuestion}</p>
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
        <div>
          {question.options.map((option, index) => (
            <label key={index}>
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
