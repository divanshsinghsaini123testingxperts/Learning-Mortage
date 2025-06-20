import {React ,useEffect,useState  } from 'react'
import { redirect, useParams } from 'react-router-dom';
import NewQuestion from '../NewQuestion/NewQuestion'
import './ActionCustomForm.css';

const CreateCustomForm = () => {
    const { formId , Id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [formName, setFormName] = useState('');
    const [formNameFr, setFormNameFr] = useState('');
    const [AdminId , setAdminId] = useState(Id);
    const createdFormId = 0; 
    useEffect(() => {
      if(formId!=-1) {
        // Fetch the form data if formId is present
        fetch(`https://localhost:7294/api/CustomForms/GetFormById/${formId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then(data => {
          // Assuming the API returns the form data including questions
          setFormName(data.EngFormName);      
          setFormNameFr(data.FrFormName);
          setAdminId(data.AdminId);
        }).catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });

        //fetch kr rhe hain questions ko 
        fetch(`https://localhost:7294/api/CustomForms/GetQuestionsByFormId/${formId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then(data => {
          // Assuming the API returns the questions data
          setQuestions(data.Questions || []);
        }).catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
        }
    }, []);

    const handlesubmits = async (event) => {
       event.preventDefault(); // Prevent the default form submission behavior
        console.log("process started");
        
        if(formId!=-1) {
          console.log("updating form");
          //call the api to update the form
          await fetch(`https://localhost:7294/api/CustomForms/UpdateForm/${formId}`, {
            method: 'PUT',
            headers : {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Id : formId, 
              EngFormName: formName,
              FrenchFormName: formNameFr,
              AdminId: AdminId,
              
            })
          }).then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
          }).catch(error => {
              throw new Error("Network response was not ok", error);
          });
          //update the questions
          //i want to send the questions array to the api
          
          await fetch(`https://localhost:7294/api/CustomForms/UpdateQuestions/${formId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Questions: questions
            })
          }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok' , response.text() );
            }
            return response.text();
          }).catch(error => {
              throw new Error("Network response was not ok", error);
          });

          ///question upated now 
          //update the endpoint 

        } else {
            
           //call the api to create a new form
                const formRes = await fetch(`https://localhost:7294/api/CustomForms/AddForm`, {
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
              const createdFormId = data.formId; // Use this directly

              console.log(createdFormId);
              //now send all the question to that newformid ,
              const questionsRes = await fetch(`https://localhost:7294/api/CustomForms/AddQuestion/${createdFormId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questions), // Send as array, not as { Questions: questions }
              });

              if (!questionsRes.ok) throw new Error('Failed to add questions');

              console.log('Form and questions created successfully');
              // Optionally redirect or show a success message here
            }
            // After successful submission, you can redirect or show a success message
            console.log("Form submitted successfully");
            redirect(`/home/${AdminId}/Custom_forms`);
      }

    function UpdateQuestion(id, updatedQuestion) {
        setQuestions(prevQuestions =>
            prevQuestions.map((q, idx) => idx === id ? updatedQuestion : q));
    }
    const addNewQuestion = () => {
        const newQuestion = {
            Id : 0 ,
            EngQuestion: '',
            FrenchQuestion: '',
            RequiredField: false,
            AnsFormat: 'text', // 
          // important 
          // hmne yaha form id isliye menstion nhi ki h
          // we know that all belong to same form id 
          // but we have to differentiate them in the backend
          // ki we just created it or updated it
          // so in our first api call , we just created a form and want the form id , that is creeated ,
          // and in next call we sent it with the question array 
          // so that the question can be added to the form
          // but their is a catch 
          // but in somecauses we have to add more questions into the form 
          // so we will just add the question to the array
          // and our update api will take care of it
        };
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    }
    const DeleteQuestion =(idx)=>{
        //remove the item from perticular index
        setQuestions(prevQuestions => prevQuestions.filter((_, index) => index !== idx));
    }
  return (
    <div className="create-form-container">
      <h2>Add Form</h2>
      <h3>Define Form Fields</h3>
      <form>
        <div className="input-group">
          <label htmlFor="formName">English Form Name</label>
          <input type="text" id="formName" name="formName" value={formName} onChange={(e)=>setFormName(e.target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="formNameFr">French Form Name</label>
          <input type="text" id="formNameFr" name="formNameFr" value={formNameFr} onChange={(e)=>setFormNameFr(e.target.value)} />
        </div>
        {/* Here we can map through the questions array and display them */}
        {questions.length > 0 && questions.map((q, idx) => (
                <NewQuestion
                    key={idx}
                    id={0}
                    x={idx + 1}
                    question={q}
                    updateQuestion={UpdateQuestion}
                    deleteQuestion={() => DeleteQuestion(idx)}
                />
        ))} 

        {/* For now, we will just add a button to add more questions */}

        <button type="button" onClick={addNewQuestion}>Add Question</button>
        <button type="submit" onClick={(e) => handlesubmits(e)}>Submit Form</button>
      </form>
    </div>
  )
}

export default CreateCustomForm