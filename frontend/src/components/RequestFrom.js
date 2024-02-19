// components/RequestForm.js
import React, { useState } from 'react';
import { useRequestsContext } from '../hooks/useRequestsContext';

const RequestForm = () => {
  const { dispatch } = useRequestsContext();
  const [request_Name, setRequestName] = useState('');
  const [Category, setCategory] = useState('');
  const [Status, setStatus] = useState('');
  const [senderUsername, setSenderUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Request Data:', {
      request_Name,
      Category,
      Status,
      senderUsername,
    });
  
    try {
      const response = await fetch('/api/uniperrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_Name,
          Category,
          Status,
          senderUsername, // Include recipient username in the request body
        }),
      });
  
      const responseData = await response.json();
      console.log('Response from Server:', responseData);
  
      if (response.ok) {
        dispatch({ type: 'CREATE_REQUEST', payload: responseData });
        setRequestName('');
        setCategory('');
        setStatus('');
        setSenderUsername('');
      } else {
        console.error('Error creating request:', responseData.error);
        // You can provide user-friendly error messages here
      }
    } catch (error) {
      console.error('Error creating request:', error);
      // You can provide user-friendly error messages here
    }
  };
  


  return (
    <div className="request-form">
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="requestName">Request Name:</label>
        <input
          type="text"
          id="request_Name"
          name="request_Name"
          value={request_Name}
          onChange={(e) => setRequestName(e.target.value)}
        />

        <label htmlFor="category">Category:</label>
        <select
          id="Category"
          name="Category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Process Safety">Process Safety</option>
          <option value="Environment">Environment</option>
          <option value="Safety">Safety</option>
          <option value="Accident">Accident</option>
          <option value="Complaint">Complaint</option>
          <option value="Loss">Loss</option>
          <option value="Over £100,000">Over £100,000</option>
          <option value="Health">Health</option>
          <option value="HR">HR</option>
          <option value="Expenses">Expenses</option>
          <option value="Overtime">Overtime</option>
          <option value="Holiday">Holiday</option>
        </select>

        <label htmlFor="status">Status:</label>
        <select
          id="Status"
          name="Status"
          value={Status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Awaiting Approval">Awaiting Approval</option>
          <option value="Approval">Approval</option>
          <option value="Completed">Completed</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="text"
          placeholder="Recipient Username"
          value={senderUsername}
          onChange={(e) => setSenderUsername(e.target.value)}
        />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};



export default RequestForm;

