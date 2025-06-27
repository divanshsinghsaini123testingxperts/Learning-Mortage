// filepath: c:\Users\Testing\Desktop\Learning Mortgage\Frontend\src\Components\CustomForms\ViewForms.jsx
import React, { useEffect , useState } from 'react'
import { useParams  , Link } from 'react-router-dom';
import './ViewForms.css';

function ViewForms() {
  const { Id: AdminId } = useParams();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7294/api/CustomForms/${AdminId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setForms(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [AdminId]);

  return (
    <div className="view-forms-container">
      <h3 className="view-forms-header">View Forms</h3>
      <table className="view-forms-table">
        <thead>
          <tr>
            <th>Form ID</th>
            <th>English Name</th>
            <th>French Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.engFormName}</td>
              <td>{row.frenchFormName}</td>
              <td>
                <Link to={`/home/${AdminId}/View_forms/${row.id}`}>View Form</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewForms;