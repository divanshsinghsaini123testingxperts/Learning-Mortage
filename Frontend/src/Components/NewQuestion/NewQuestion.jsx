import React, { useEffect } from 'react';
import './NewQuestion.css';

const NewQuestion = (props) => {
  const { id, x, question, updateQuestion, deleteQuestion } = props;

  const handleChange = (field, value) => {
    updateQuestion(id, { ...question, [field]: value });
  };
  const handleOptionChange = (field , value) =>{
     
  }

    useEffect(() => {
       async function TranslatorCall(text) {
         const body = {
           text: text,
           sourceLang: "en",
           targetLang: "fr"
         };
   
         try {
           const response = await fetch(`https://localhost:7294/api/CustomForms`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(body)
           });
   
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
   
           const data = await response.json(); 
           handleChange('frenchQuestion', data.translated) ;
           console.log("Data translated successfully:", data.translated);
         } catch (error) {
           console.error('Translation problem:', error);
         }
       }
        if (question.engQuestion && question.engQuestion.trim() !== ""){
          const handler = setTimeout(() => {
            TranslatorCall(question.engQuestion);
          }, 1000); // 2 second delay
          return () => clearTimeout(handler); 
        }
         
     }, [question.engQuestion]);
   


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
            required
          >
            <option value="">--Select--</option>
            <option value="text">Text</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
        {/* dynamically change the options to add */}
        {(question.answerFormat === "multiple-choice" || question.answerFormat === "checkbox") && (
          <div className="input-group">
            <label>Options</label>
            {(question.options || []).map((option, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                <input
                  type="text"
                  value={option}
                  onChange={e => {
                    const newOptions = [...(question.options || [])];
                    newOptions[idx] = e.target.value;
                    handleChange('options', newOptions);
                  }}
                  placeholder={`Option ${idx + 1}`}
                />
                <button
                  type="button"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    const newOptions = [...(question.options || [])];
                    newOptions.splice(idx, 1);
                    handleChange('options', newOptions);
                  }}
                  aria-label="Remove option"
                >
                  &minus;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleChange('options', [...(question.options || []), ""])}
              style={{ marginTop: 4 }}
            >
              + Add Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewQuestion;
