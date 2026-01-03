import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: 220, minHeight: "100vh" }}>
        <h5>Admin</h5>
        <hr />

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/products">
              Products
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/categories">
              Categories
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/orders">
              Orders
            </Link>
          </li>

          <li className="nav-item mt-3">
            <button className="btn btn-sm btn-danger" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-fill p-4">
        <Outlet />
      </div>
    </div>
  );
}