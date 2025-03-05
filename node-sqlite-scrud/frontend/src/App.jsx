import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import ReadDeleteUsers from "./components/ReadDeleteUsers.jsx";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
      <h1 className="text-center mb-4 text-dark fw-bold">User Management</h1>
      <div className="w-75">
        <div className="card p-4 shadow mb-4 bg-light border-0 rounded-3" style={{ borderLeft: "5px solid #5bc0de" }}>
          <h2 className="text-center text-info">Create User</h2>
          <CreateUser onUserAdded={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-sm btn-info w-50 mt-3 mx-auto d-block" />
        </div>
        <div className="card p-4 shadow mb-4 bg-light border-0 rounded-3" style={{ borderLeft: "5px solid #f0ad4e" }}>
          <h2 className="text-center text-warning">Users List</h2>
          <ReadDeleteUsers refresh={refresh} buttonClass="btn btn-sm btn-warning w-50 mt-2 mx-auto d-block" />
        </div>
        <div className="card p-4 shadow bg-light border-0 rounded-3" style={{ borderLeft: "5px solid #5cb85c" }}>
          <h2 className="text-center text-success">Update User</h2>
          <UpdateUser onUserUpdated={() => setRefresh(prev => prev + 1)} buttonClass="btn btn-sm btn-success w-50 mt-3 mx-auto d-block" />
        </div>
      </div>
    </div>
  );
}

export default App;
