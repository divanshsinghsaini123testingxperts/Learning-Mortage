import {React ,useEffect,useState , useLocation } from 'react'
import NewQuestion from '../NewQuestion/NewQuestion'
import './ActionCustomForm.css';

const CreateCustomForm = () => {

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        //ye bhi condition pr depend krta h ki new form create krna h ya existing form ko edit krna h
        // If we are creating a new form, we can initialize the questions array with an empty array
        // fetch('https://localhost:7294/api/CustomForm/GetAllQuestions', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }).then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // }).then(data => {
        //     setQuestions(data);
        // }).catch(error => {
        //     console.error('There was a problem with the fetch operation:', error);
        // });
    }, []);
    
    const handlesubmit = () => {
        // Here we can handle the form submission
        // We can send the questions array to the server or do whatever we want with it
        console.log("Form submitted with questions: ", questions);
        //call the api to add or update the form 
    }
    const [formName, setFormName] = useState('');
    const [formNameFr, setFormNameFr] = useState('');
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
            AnsFormat: 'text'
        };
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    };
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
          <input type="text" id="formName" name="formName" placeholder="Enter Form Name" onChange={(e)=>setFormName(e.target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="formNameFr">French Form Name</label>
          <input type="text" id="formNameFr" name="formNameFr" placeholder="Entrez le nom du formulaire"  onChange={(e)=>setFormNameFr(e.target.value)} />
        </div>
        {/* Here we can map through the questions array and display them */}
        {questions.map((q, idx) => (
                <NewQuestion
                    key={idx}
                    id={idx}
                    x={idx + 1}
                    question={q}
                    updateQuestion={UpdateQuestion}
                    deleteQuestion={() => DeleteQuestion(idx)}
                />
        ))} 

        {/* For now, we will just add a button to add more questions */}

        <button type="button" onClick={addNewQuestion}>Add Question</button>
        <button type="submit" onClick={handlesubmit}>Submit Form</button>
      </form>
    </div>
  )
}

export default CreateCustomForm