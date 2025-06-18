import React, { useState } from 'react';
import './Customers.css';


const AddCustomer = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const onCancel = () => {
        // Logic to handle cancel action, e.g., navigate back or reset form
        window.history.back(); // This will take the user back to the previous page
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
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
