import React from 'react';

function Question(props) {
  const { idx, questionId, engQuestion, frenchQuestion, questionType } = props;

  return (
    <div>
      <p>Q{idx + 1}</p>
      <p>English: {engQuestion}</p>
      <p>French: {frenchQuestion}</p>

      {questionType === "checkbox" && (
        <label>
          <input type="checkbox" /> Option
        </label>
      )}

      {questionType === "text" && (
        <input type="text" placeholder="Your answer" />
      )}

      {questionType === "multiple-choice" && (
        <>
          <label><input type="radio" name={`q-${questionId}`} /> Option 1</label><br />
          <label><input type="radio" name={`q-${questionId}`} /> Option 2</label>
        </>
      )}
    </div>
  );
}

export default Question;
