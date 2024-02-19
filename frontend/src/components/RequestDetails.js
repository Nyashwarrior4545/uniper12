//RequestDetails

import React, { useState } from 'react';
import { useRequestsContext } from '../hooks/useRequestsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './AuthStyles.css';
 

const RequestDetails = ({ request }) => {
  const { dispatch } = useRequestsContext();
  const [selectedStatus, setSelectedStatus] = useState(request.Status);
  const [isApproved, setIsApproved] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleStatusChange = async (newStatus) => {
    const response = await fetch(`/api/uniperrequest/${request._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ Status: newStatus }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_REQUEST', payload: json });
      setSelectedStatus(newStatus);
    }
  };

  const handleApprove = async () => {
    // Perform any additional logic related to approving the request
    // For example, you might want to send a request to the server

    // Set the state to indicate that the request has been approved
    setIsApproved(true);

    // Open the modal to show the approval message
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Close the modal
    setModalIsOpen(false);
  };
  

  return (
  
      <tr>
        <td>{request.request_Name}</td>
        <td>{request.Category}</td>
        <td>
          <div className="status-dropdown">
            <select
              value={selectedStatus}
              onChange={(e) => {
                handleStatusChange(e.target.value);
                setSelectedStatus(e.target.value);
              }}
            >
              <option value="Open">Open</option>
              <option value="Awaiting Approval">Awaiting Approval</option>
              <option value="Approval">Approval</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </td>
        <td>
          {request.attachedFile && (
            <a
              href={`/api/uniperrequest/${request._id}/file/${request.attachedFile}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View File
            </a>
          )}
        </td>
        <td>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</td>
        <td className="material-symbols-outlined" onClick={handleApprove}>
        {isApproved ? (
          <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
        ) : (
          <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
        )}
      </td>

      {/* Modal for Approval Message */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Approval Message"
        style={{
          content: {
            width: '300px',  // Set the desired width
            margin: 'auto',  // Center the modal horizontally
            height: '300px',
          }
        }}
      >
        <div>
          <h2>Request Approved!</h2>
          <p>The request has been successfully approved.</p>
          <button className='login-button' onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </tr>
  );
  
};
// ... (previous code)

export default RequestDetails;
