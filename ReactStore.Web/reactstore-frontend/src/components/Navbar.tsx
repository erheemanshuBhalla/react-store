import { Link } from "react-router-dom";

export default function Navbar() {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Altaliza</Link>

        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Products</Link>
          </li>

          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/orders">My Orders</Link>
            </li>
          )}

          {/* ✅ ADMIN MENU */}
          {user?.role === "Admin" && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Admin
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/admin">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/orders">
                    Orders
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
