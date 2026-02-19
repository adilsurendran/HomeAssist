import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import axios from "axios";
import "./admin.css";

const AdminWorkers = () => {
  const [view, setView] = useState("approved");
  const [myworkers, setMyworkers] = useState([]);

  const getworkers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/getallworkers"
    );
    setMyworkers(res.data.worker);
  };

  const changeStatus = async (loginId) => {
    await axios.patch(
      `http://localhost:5000/api/admin/workerstatus/${loginId}`
    );
    getworkers();
  };

  useEffect(() => {
    getworkers();
  }, []);

  return (
    <>
      <h3 className="neon-text mb-4">Manage Workers</h3>

      <div className="mb-3 d-flex gap-3">
        <Button
          className={view === "approved" ? "neon-btn" : "btn-outline-info"}
          onClick={() => setView("approved")}
        >
          Approved Workers
        </Button>

        <Button
          className={view === "pending" ? "neon-btn" : "btn-outline-info"}
          onClick={() => setView("pending")}
        >
          Pending Workers
        </Button>
      </div>

      <Table responsive hover className="dark-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Expertise</th>
            <th>Fee</th>
            <th>Address</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {myworkers
            .filter((w) =>
              view === "approved"
                ? w.login_id?.status === "approved"
                : w.login_id?.status !== "approved"
            )
            .map((u) => (
              <tr key={u._id}>
                <td className="text-dark">{u.name}</td>
                <td className="text-dark">{u.mail}</td>
                <td className="text-dark">{u.number}</td>
                <td className="text-dark">{u.expertise}</td>
                <td className="text-dark">₹ {u.fee}</td>
                <td className="text-dark">{u.address}</td>

                <td>
                  <img
                    src={`http://localhost:5000/uploads/${u.image}`}
                    alt="worker"
                    width="60"
                    height="50"
                    style={{
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </td>

                <td>
                  <Badge
                    bg={
                      u.login_id?.status === "approved"
                        ? "success"
                        : "warning"
                    }
                  >
                    {u.login_id?.status}
                  </Badge>
                </td>

                <td>
                  {u.login_id?.status === "approved" ? (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => changeStatus(u.login_id._id)}
                    >
                      Reject
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => changeStatus(u.login_id._id)}
                    >
                      Approve
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminWorkers;
