import  { useEffect , useState} from 'react'
import './Customers.css';
import { Link , useParams } from 'react-router-dom';
const Customers = () => {
     const { Id } = useParams();
     const [data, setData] = useState([]);
     const handleDelete= (id) =>{
        // pending implementation of delete logic here 
        fetch(`https://localhost:7294/api/Customer/DeleteCustomer/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then(data => {
          console.log('Customer deleted successfully:', data);
          // Optionally, you can refresh the customer list or update the state
          setData(prevData => prevData.filter(customer => customer.Id !== id));
        }).catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
        // window.location.reload(); // Avoid reloading the page, update state instead
     }
   useEffect(() => {
     fetch(`https://localhost:7294/api/Customer/by-employee/${Id}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     }).then(response => {
       if(!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     }).then(data => {
       console.log('Customers fetched successfully:', data);
       setData(data);
     }).catch(error => {
       console.error('There was a problem with the fetch operation:', error);
     });
   }, [Id]);
  return (
    <> 
        <div className="customers-header">
          <h2 className="customers-title">Customers</h2>
            <Link to={`/home/${Id}/Add_customer`} className="action-button add-customer">Add Customer</Link>
        </div>
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.address}</td>
                <td className="action-buttons">
                  <div className="button-group">
                    <Link to={`/home/${Id}/Edit_customer/${row.id}`} className="action-button edit-customer">Edit</Link>
                    <button onClick={() => handleDelete(row.id)} className="action-button delete-button">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}
export default Customers;