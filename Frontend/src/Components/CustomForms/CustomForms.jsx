import { useEffect } from "react"




import { useEffect } from "react";


export const CustomForms = () => {
  useEffect(() => {
    const data = fetch('https://localhost:7294/api/CustomForm/GetAllForms', {
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
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, [])
  return (<>
    <header>Custom Forms</header>
    <div className="custom-forms-container">
      <h3>Form Management</h3>
      <button>Add Form</button>
    </div>
    <div className="form-list">
        <table>
            <thead>
              <tr>
                <th>Form Name</th>
                <th>Customer Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {data.map((row) => (
            <tr key={row.id}>
                <td>{row.formName}</td>
                <td>{row.customerName}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
  </>
  )
}
