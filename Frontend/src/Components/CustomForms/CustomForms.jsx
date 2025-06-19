import { useEffect } from "react"
import { Link , useParams } from "react-router-dom";
import './CustomForms.css';

const CustomForms = () => {
  const { Id } = useParams();
  // useEffect(() => {
  //   const data = fetch('https://localhost:7294/api/CustomForm/GetAllForms', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   }).then(data => {
  //     console.log('Forms fetched successfully:', data);
  //   }).catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });
  // }, [])
  return (
    <div className="custom-forms-container">
      <header>Custom Forms</header>
      <div className="form-management">
        <h3>Form Management</h3>
        <Link to={`/home/${Id}/Create_custom_form`}>Add Form</Link>
      </div>
      <div className="form-list">
        <table>
          <thead>
            <tr>
              <th>Form Name</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((row) => (
              <tr key={row.id}>
                <td>{row.formName}</td>
                
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomForms;