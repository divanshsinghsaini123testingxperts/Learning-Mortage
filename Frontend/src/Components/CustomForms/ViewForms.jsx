

import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import  {Form}  from './Form/Form';

function ViewForms() {
  //get all the forms created by the user
  const {Id : AdminId} = useParams() ;
  const [forms, setForms] = useState([]);
   useEffect(() => {
    const result = fetch(`https://localhost:7294/api/CustomForms/${AdminId}`, {
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
      console.log('Forms fetched successfully:', data);
      setForms(data);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [AdminId]);
  return (
    <>
        <h3>View Forms</h3>
        {forms.map((row) => (
              <Form key={row.id} formId={row.id} frenchFormName={row.frenchFormName} engFormName={row.engFormName} />
        ))}
    </>
  )
}

export default ViewForms