import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../thunks/AccountThunks";
import { useLayoutEffect } from "react";
import { loadAuthInfoFromStorage } from "../../services/AuthService";
import { INFO_KEY_NAME } from "../../constants/api";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const { allAccount } = useSelector((state) => state.accountsReducer);

  const user = loadAuthInfoFromStorage(INFO_KEY_NAME); 

  useLayoutEffect(() => {
    if (allAccount?.length <= 0) {
      dispatch(getAllAccount());
    }
  }, [allAccount?.length, dispatch]);



  const adminRoutes = [
    { path: "/", name: "Trang chủ" },
    { path: "/account-manager", name: "Quản lý tài khoản" },
    { path: "/academic-manager", name: "Quản lý bậc học" },
    { path: "/subject-manager", name: "Quản lý môn học" },
    { path: "/college-exam-group-manager", name: "Quản lý nhóm môn" },
    { path: "/admission-student-manager", name: "Quản lý tuyển sinh" },
    { path: "/evaluation-manager", name: "Quản lý phương thức tuyển sinh" },
    { path: "/major-manager", name: "Quản lý ngành học" },
    { path: "/news-manager", name: "Quản lý tin tức" },
    { path: "/type-news-manager", name: "Quản lý loại tin tức" },
    { path: "/feedback-manager", name: "Quản lý tin phản hồi" },
    { path: "/location-manager", name: "Quản lý địa điểm" },
    { path: "/function-manager", name: "Quản lý chức năng" },
    { path: "/contact-manager", name: "Quản lý liên hệ" },
    { path: "/handbook-manager", name: "Quản lý Handbook" },
    { path: "/audit-manager", name: "Quản lý" },
  ];

  const userRoutes = [
    { path: "/admission-student-manager", name: "Quản lý tuyển sinh" },
    { path: "/news-manager", name: "Quản lý tin tức" },
    { path: "/feedback-manager", name: "Quản lý tin phản hồi" },
    { path: "/contact-manager", name: "Quản lý liên hệ" },
    { path: "/handbook-manager", name: "Quản lý Handbook" },
  ];

  const routes = user?.role === "root" ? adminRoutes  :userRoutes ;


  return (
    <div className="w-1/6">
      <aside className="w-1/6 bg-gray-900 text-white min-h-screen py-6 fixed top-0 left-0 h-screen pt-24 overflow-y-auto">
        <nav>
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  onClick={(e) => {
                    if (currentPath === route.path) {
                      e.preventDefault(); 
                    }
                  }}
                  className={`block px-4 rounded hover:bg-gray-700 border-b border-gray-500 py-4 ${
                    currentPath === route.path ? "font-bold bg-gray-700" : ""
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Navbar;
