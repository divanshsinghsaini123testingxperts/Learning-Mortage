import { useEffect  , useState} from "react"
import { Link , useParams } from "react-router-dom";
import './CustomForms.css';

const CustomForms = () => {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const result = fetch(`https://localhost:7294/api/CustomForms/${Id}`, {
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
      setData(data);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [Id]);
  const handleDelete = (formId) => {
    fetch(`https://localhost:7294/api/CustomForms/${formId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok' , response.text());
      }
      return response.text();
    }).then(data => {
      console.log('Form deleted successfully:', data);
      // Update the state to remove the deleted form
      setData(prevData => prevData.filter(form => form.id !== formId));
    }).catch(error => {
      console.error('There was a problem with the delete operation:', error);
    });
  }
  const handleEdit = (formId) => {
    // Redirect to the edit form page with the formId
  
    console.log("Editing form with ID:", formId);
    window.location.href = `/home/${Id}/Create_custom_form/${formId}`;
  }
  return (
    <div className="custom-forms-container">
      <header>Custom Forms</header>
      <div className="form-management">
        <h3>Form Management</h3>
        <Link to={`/home/${Id}/Create_custom_form/-1`}>Add Form</Link>
      </div>
      <div className="form-list">
        <table>
          <thead>
            <tr>
              <th>Form ID</th>
              <th>Form Name</th>
              <th>Form Name (French)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {console.log(row)}
                <td>{row.id}</td>
                <td>{row.engFormName}</td>
                <td>{row.frenchFormName}</td>
                <td>
                  <button onClick={() => handleEdit(row.id)}>Edit</button>
                  <button onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomForms;