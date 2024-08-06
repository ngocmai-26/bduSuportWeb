import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-1/6">
      <aside className="w-1/6 bg-gray-900 text-white min-h-screen py-6 fixed top-0 left-0 h-screen pt-24 overflow-y-auto">
        <nav>
          <ul className="">
            <li>
              <Link
                to="/"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/account-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/account-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý tài khoản
              </Link>
            </li>
            <li>
              <Link
                to="/academic-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/academic-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý bậc học
              </Link>
            </li>
            <li>
              <Link
                to="/subject-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/subject-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý môn học
              </Link>
            </li>
            <li>
              <Link
                to="/college-exam-group-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/college-exam-group-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý nhóm môn
              </Link>
            </li>
            <li>
              <Link
                to="/admission-student-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/admission-student-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý tuyển sinh
              </Link>
            </li>
            <li>
              <Link
                to="/evaluation-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/evaluation-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý phương thức tuyển sinh
              </Link>
            </li>
            <li>
              <Link
                to="/major-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/major-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý ngành học
              </Link>
            </li>
            <li>
              <Link
                to="/news-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/news-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý tin tức
              </Link>
            </li>
            <li>
              <Link
                to="/type-news-manager"
                className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                  currentPath === "/type-news-manager" ? "font-bold bg-gray-700" : ""
                }`}
              >
                Quản lý loại tin tức
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Navbar;
