




import  { useEffect , useState} from 'react'

const Customers = () => {
     const handleDelete= (id) =>{
        // pending implementation of delete logic here 
     }
  //  useEffect(() => {
  //    const data = fetch('https://localhost:7294/api/Customer/GetAllCustomers', {
  //      method: 'GET',
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //    }).then(response => {
  //      if (!response.ok) {
  //        throw new Error('Network response was not ok');
  //      }
  //      return response.json();
  //    }).then(data => {
  //      console.log('Customers fetched successfully:', data);
  //    }).catch(error => {
  //      console.error('There was a problem with the fetch operation:', error);
  //    });
  //  }, []);
  return (
    <>
        <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((row) => (
                <tr key={row.Id}>
                  <td>{row.Id}</td>
                  <td>{row.Name}</td>
                  <td>{row.Email}</td>
                  <td>{row.Address}</td>
                  <td>
                    <button >Edit</button> 
                    <button onClick={() => handleDelete(row.Id)}>Delete</button>
                  </td>
                </tr>
              ))} */}
            </tbody>
        </table>
    </>
  )
}
export default Customers;