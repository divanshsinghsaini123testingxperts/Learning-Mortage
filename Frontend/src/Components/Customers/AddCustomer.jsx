import React, { useState } from 'react';
import './Customers.css';
import { useParams  , useNavigate} from 'react-router-dom';

const AddCustomer = () => {
    const navigate = useNavigate();
    const { Id } = useParams(); // Assuming you want to use addId for some logic
    const [formData, setFormData] = useState({
       
        Name: '',
        Email: '',
        Address: '',
        EmpId: parseInt(Id , 10) 
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onCancel = () => {
        navigate(-1); // Go back
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        fetch('https://localhost:7294/api/Customer/AddCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(response => {
            if (!response.ok) {
                console.log("ssss");
                throw new Error('Network response was not ok');
            }
            return response.text();  // <-- read text response
        })
        .then(data => {
            console.log('Server response:', data);  // <-- will print "added successfully"
            navigate(`/home/${Id}`); // Navigate to the Customers page after successful addition
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    return (
        <div className="add-customer-container">
            <h2>Add New Customer</h2>
            <form className="customer-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Enter customer name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        placeholder="Enter customer email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="Address"
                        value={formData.Address}
                        onChange={handleChange}
                        placeholder="Enter customer address"
                        rows="3"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">Save Customer</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;
