


import React from 'react'
import {Link , useNavigate, useParams} from 'react-router-dom';   
export const Form = (props) => {
    const { formId , frenchFormName  , engFormName } = props;
    const navigate = useNavigate();
    const { AdminId } = useParams();
    const handleView = (formId) => {
        // Redirect to the view form page with the formId
        console.log("Viewing form with ID:", formId);
        
        navigate(`/home/${AdminId}/View_forms/${formId}`);
    }
  return (
    <div>
      <h5>Form ID: {formId}</h5>
      <p>English Name: {engFormName}</p>
      <p>French Name: {frenchFormName}</p>
      <button onClick={() => handleView(formId)}>View</button>
    </div>
  )
}
