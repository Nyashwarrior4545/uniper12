import React, { useEffect, useState } from "react";
import { useRequestsContext } from "../hooks/useRequestsContext";
import RequestDetails from "../components/RequestDetails";
import RequestForm from "../components/RequestFrom";

const categoriesOrder = [
  "Process Safety",
  "Environment",
  "Safety",
  "Accident",
  "Complaint",
  "Loss",
  "Over £100,000",
  "Health",
  "HR",
  "Expenses",
  "Overtime",
  "Holiday",
];

const Home = () => {
  const { requests, dispatch } = useRequestsContext();
  const [isSorted, setIsSorted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/uniperrequest");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_REQUESTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
      setIsLoading(false);
    };

    fetchRequests();
  }, [dispatch]);

  const handleFilterClick = () => {
    setIsSorted(!isSorted);
  };

  const sortedRequests = [...requests].sort((a, b) => {
    return categoriesOrder.indexOf(a.Category) - categoriesOrder.indexOf(b.Category);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container" style={{ position: 'relative' }}>
      <div className="action-header">
        {/* Add your action header component here */}
      </div>
      <button
        onClick={handleFilterClick}
        style={{
          position: 'absolute',
          top: '-10px', // Adjust the top property to move the button higher
          right: '1150px', // Adjust the right property to position it on the right
          backgroundColor: "#3498db",
          textAlign: "center",
          color: "#fff",
          width: "75px",
          height: "30px",
          cursor: "pointer",
          border: "none",
          borderRadius: "20px",
        }}
      >
        {isSorted ? "Remove" : "Filter"}
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(isSorted ? sortedRequests : requests).map((request) => (
              <RequestDetails request={request} key={request._id} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-container">
        <RequestForm />
      </div>
    </div>
  );
};

export default Home;

