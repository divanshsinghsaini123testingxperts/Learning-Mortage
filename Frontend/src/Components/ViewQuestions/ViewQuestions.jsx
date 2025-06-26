



import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import  Question  from './Question.jsx'
export default function ViewQuestion() {
  const { formId } = useParams();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
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
          setQuestions(data);
          console.log('Questions fetched successfully:', data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }, [formId]);
  return (
     <>
        <div>
            <h3>View Name {formId}</h3>
            {questions.map((question , index) => (
                <Question 
                idx = {index} 
                key={question.id}
                questionId = {question.id} engQuestion = {question.engQuestion}
                frenchQuestion={question.frenchQuestion} questionType ={question.questionType} />
            ))}
        </div>
     </>
  )
}
