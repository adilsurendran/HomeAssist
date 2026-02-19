import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import axios from "axios";
import "./admin.css";

const AdminShops = () => {
  const [view, setView] = useState("approved");
  const [myshops, setMyshops] = useState([]);

  const getshops = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/getallshops"
    );
    setMyshops(res.data.shop);
  };

  const changeStatus = async (loginId) => {
    await axios.patch(
      `http://localhost:5000/api/admin/shopstatus/${loginId}`
    );
    getshops();
  };

  useEffect(() => {
    getshops();
  }, []);

  return (
    <>
      <h3 className="neon-text mb-4">Manage Shops</h3>

      <div className="mb-3 d-flex gap-3">
        <Button
          className={view === "approved" ? "neon-btn" : "btn-outline-info"}
          onClick={() => setView("approved")}
        >
          Approved Shops
        </Button>

        <Button
          className={view === "pending" ? "neon-btn" : "btn-outline-info"}
          onClick={() => setView("pending")}
        >
          Pending Shops
        </Button>
      </div>

      <Table responsive hover className="dark-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shop Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {myshops
            .filter((s) =>
              view === "approved"
                ? s.login_id?.status === "approved"
                : s.login_id?.status !== "approved"
            )
            .map((u) => (
              <tr key={u._id}>
                <td className="text-dark">{u.name}</td>
                <td className="text-dark">{u.mail}</td>
                <td className="text-dark">{u.number}</td>
                <td className="text-dark">{u.address}</td>

                <td>
                  <img
                    src={`http://localhost:5000/uploads/${u.image}`}
                    alt="shop"
                    width="70"
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

export default AdminShops;
