import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import  Question  from './Question.jsx'
import { useNavigate } from 'react-router-dom';
import './ViewQuestions.css';

export default function ViewQuestion() {
  const { Id ,formId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [ customers , setCustomers ] = useState([]);
  const [formName, setFormName] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customerError, setCustomerError] = useState('');
  const [formResponse, setFormResponse] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
      console.log('Fetching data for formId:', formId, 'and Id:', Id);
      const fetchQuestions = fetch(`https://localhost:7294/api/CustomForms/GetQuestionsByFormId/${formId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch questions');
        return res.json();
      });

      const fetchCustomers = fetch(`https://localhost:7294/api/Customer/by-employee/${Id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch customers');
        return res.json();
      });

      const fetchFormName = fetch(`https://localhost:7294/api/CustomForms/GetFormById/${formId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch form name');
        return res.json();
      });

      Promise.all([fetchQuestions, fetchCustomers, fetchFormName])
        .then(([questionsData, customersData, formNameData]) => {
          console.log('Questions Data:', questionsData);
          setQuestions(questionsData);
          setCustomers(customersData);
          setFormName(formNameData.formName);
          console.log('All data fetched successfully');
        })
        .catch((err) => {
          console.error('Error during data fetching:', err);
        });
}, [formId, Id]);

const handleSubmit = () => {
    if (!selectedCustomer) {
      setCustomerError('Please select a customer.');
      return;
    }
    
    const convertedResponses = (optionArray)=>{
        var s = '';
        for (let i = 0; i < optionArray.length; i++) {
            if (optionArray[i]) {
              if( i == 0){
                s += optionArray[i];

              }else{ 
                s = s + '^' + optionArray[i];}
            }
        }
        return s;
    }
    //now we need to bind all the details into a array and send it to backend 
    // questionId , FormId , CustomerId , Answer ( if this is text then sent it as well , if it is checkbox then concatinate the values and send it as a string )
      const responses = questions.map((question, index) => {
        return {
          questionId: question.id,
          formId: formId,
          customerId: selectedCustomer,
          answer: typeof formResponse[index] === 'string' ? formResponse[index] :  convertedResponses(formResponse[index]), // Use the response from formResponse or an empty string if not provided
        };
      });


    console.log('Responses to be submitted:', responses);
    async function submitResponses() {
          await fetch(`https://localhost:7294/api/CustomForms/AddFormEntry/${formId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( responses ),
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to submit responses');
            return res.text();
          })
          .then((data) => {
            console.log('Form submitted successfully:', data);
            navigate(`/home/${Id}/View_forms`);
          })
          .catch((err) => {
            console.error('Error during form submission:', err);
          });
        }
    async function IsResponseExists() {
      const response = await fetch(`https://localhost:7294/api/CustomForms/CheckentryByCustomerId/${selectedCustomer}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formId)
      }).then((res) => {
        if (!res.ok) throw new Error('Failed to check if response exists');
      return res.json();
    }).then((data) => {
        console.log('Response exists:', data);
        if (data) {
          alert('Response already exists for this customer. Please edit the existing response.');
          //refresh the page 
          navigate(`/home/${Id}/View_forms/${formId}`);
        }
      });
    }
    IsResponseExists();
    submitResponses();
}

  return (
    <div className="view-questions-container">
      <div className="view-questions-header">
        <h3>{formName}</h3>
        <h3>*All Questions are mandatory</h3>
      </div>
      <label className="customer-select-label">Select Customer - </label>
      <select
        className="customer-select"
        value={selectedCustomer}
        onChange={e => {
          setSelectedCustomer(e.target.value);
          setCustomerError('');
        }}
      >
        <option value="">-- Please select a customer --</option>
        {customers.map(cust => (
          <option key={cust.id} value={cust.id}>
            {cust.name}
          </option>
        ))}
      </select>
      {customerError && <span className="customer-error">{customerError}</span>}
      {questions.map((question , index) => (
        <Question 
          idx={index} 
          key={question.id}
          question={question}
          setFormResponse={setFormResponse} 
          formResponse={formResponse}
        />
      ))}
      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>
    </div>
  )
}
