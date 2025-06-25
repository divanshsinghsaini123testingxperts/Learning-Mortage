import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewQuestion from '../NewQuestion/NewQuestion';
import './ActionCustomForm.css';
import { form } from 'framer-motion/client';

const CreateCustomForm = () => {
  var { formId, Id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [formName, setFormName] = useState('');
  const [formNameFr, setFormNameFr] = useState('');
  const [AdminId, setAdminId] = useState(Id);
  const redirect = useNavigate();

  useEffect(() =>{
    formId = parseInt(formId, 10); // Ensure formId is an integer
    if (formId != -1) {
      // Fetch the form data if formId is present
     
      console.log(typeof formId);
      console.log(formId);
      fetch(`https://localhost:7294/api/CustomForms/GetFormById/${formId}`
             , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setFormName(data.engFormName);
          setFormNameFr(data.frenchFormName);
          setAdminId(data.adminId);
          console.log('Form fetched successfully:', data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
     

      // Fetch questions for the form
      fetch(`https://localhost:7294/api/CustomForms/GetQuestionsByFormId/${formId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setQuestions(data || []);
          console.log('Questions fetched successfully:', data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
        
    }
  }, []);

  const handlesubmits = async (event) => {
    // event.preventDefault();
    console.log('process started');

    if (formId != -1) {
      console.log('updating form');
      // Update the form
      await fetch(`https://localhost:7294/api/CustomForms/UpdateForm/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: formId,
          EngFormName: formName,
          FrenchFormName: formNameFr,
          AdminId: AdminId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .catch((error) => {
          throw new Error('Network response was not ok', error);
        });

      // Update the questions
      await fetch(`https://localhost:7294/api/CustomForms/UpdateQuestion/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questions), // Send as array, not as { Questions: questions }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok', response.text());
          }
          return response.text();
        })
        .catch((error) => {
          throw new Error('Network response was not ok', error);
        });
    } else {
      // Create a new form
      const formRes = await fetch('https://localhost:7294/api/CustomForms/AddForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id: 0, // Assuming Id is auto-generated
          EngFormName: formName,
          FrenchFormName: formNameFr,
          AdminId: AdminId,
        }),
      });

      if (!formRes.ok) throw new Error('Failed to create form');
      const data = await formRes.json();
      const createdFormId = data.formId;

      console.log(createdFormId);
      // Add questions to the new form
      const questionsRes = await fetch(`https://localhost:7294/api/CustomForms/AddQuestion/${createdFormId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questions),
      });

      if (!questionsRes.ok) throw new Error('Failed to add questions');

      console.log('Form and questions created successfully');
    }
    // After successful submission, you can redirect or show a success message
    console.log('Form submitted successfully');
    redirect(`/home/${AdminId}/Custom_forms`);
  };

  function UpdateQuestion(id, updatedQuestion) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, idx) =>
        q.Id !== undefined && q.Id !== 0 ? q.Id === id : idx === id
          ? { ...q, ...updatedQuestion }
          : q
      )
    );
  }

  const addNewQuestion = () => {
    const newQuestion = {
      Id: 0,
      EngQuestion: '',
      FrenchQuestion: '',
      AnsFormat: 'Text',
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const DeleteQuestion = (idx) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, index) => index !== idx));
  };

  return (
    <div className="create-form-container">
      <h2>Add Form</h2>
      <h3>Define Form Fields</h3>
      <form>
        <div className="input-group">
          <label htmlFor="formName">English Form Name</label>
          <input
            type="text"
            id="formName"
            name="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="formNameFr">French Form Name</label>
          <input
            type="text"
            id="formNameFr"
            name="formNameFr"
            value={formNameFr}
            onChange={(e) => setFormNameFr(e.target.value)}
          />
        </div>
        {/* Map through the questions array and display them */}
        {questions.length > 0 &&
          questions.map((q, idx) => (
            <NewQuestion
              key={idx}
              id={idx}
              x={idx + 1}
              question={q}
              updateQuestion={UpdateQuestion}
              deleteQuestion={() => DeleteQuestion(idx)}
            />
          ))}
        <button type="button" onClick={addNewQuestion}>
          Add Question
        </button>
        <button type="button" onClick={handlesubmits}>
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default CreateCustomForm;
