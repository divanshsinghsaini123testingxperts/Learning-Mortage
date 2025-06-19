import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './Customers.css';

const EditCustomer = (props) => {    
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCustomer = async () => {
        try {          
          const response = await fetch(`https://localhost:7294/api/Customer/GetCustomerByID${customerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCustomerData(data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCustomer();
    }, [customerId]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const updatedCustomer = {
        id: customerId,
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        EmpId: customerData.empId
      };

      try {
        const response = await fetch(`https://localhost:7294/api/Customer/${updatedCustomer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCustomer),
        });
        console.log(await response.text());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Customer updated successfully');
        // Navigate with success message in state
        navigate(`/home/${customerData.empId}`, {
          state: { 
            message: 'Customer updated successfully',
            type: 'success'
          }
        });

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message);
      }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!customerData) return <div>No customer data found</div>;

    return (
      <div className="edit-customer-container">
        <h2>Edit Customer</h2>
        <form onSubmit={handleSubmit} className="edit-customer-form">
          <input type='hidden' id='customerId' name='customerId' value={customerData.id} />
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              defaultValue={customerData.name} 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              defaultValue={customerData.email} 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              defaultValue={customerData.address} 
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Save Changes</button>
        </form>
      </div>
    );
}

export default EditCustomer