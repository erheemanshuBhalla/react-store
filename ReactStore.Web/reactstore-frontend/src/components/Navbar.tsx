import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Altaliza</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Products</Link>
            </li>
            <li><Link className="nav-link" to="/cart">Cart</Link></li>

            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">My Orders</Link>
              </li>
            )}

            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">Admin Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/categories">Admin Categories</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-sm btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
