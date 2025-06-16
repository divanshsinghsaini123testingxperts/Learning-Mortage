



import React from 'react'

const EditCustomer = (props) => {
    const handleSubmit = (event) => {
        //pending
    }
  return (
    <>
        <h2>Edit Customer</h2>
        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div>
            <input type="hidden" id="Id" name="id" defaultValue={props.Id} />
            <input type='hidden' id='EmpId' name='customerId' defaultValue={props.EmpID} />
            <label htmlFor="name">Name:</label>
            <input type="text" id="Name" name="name" defaultValue={props.Name} />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="Email" name="email" defaultValue={props.Email} />
            </div>
            <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="Address" name="address" defaultValue={props.Address} />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    </>
  )
}

export default EditCustomer