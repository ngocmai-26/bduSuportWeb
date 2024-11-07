import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../thunks/AccountThunks";
import { useLayoutEffect } from "react";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const { allAccount } = useSelector((state) => state.accountsReducer);

  useLayoutEffect(() => {
    if (allAccount.length <= 0) {
      dispatch(getAllAccount());
    }
  }, [allAccount.length, dispatch]);

  const userRole = allAccount.length > 0 ? allAccount[0].role : null;

  const routes = [
    { path: "/", name: "Dashboard" },
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
  ];

  
  const filteredRoutes =
    userRole === "root"
      ? routes
      : routes.filter((route) =>
          ["Quản lý tuyển sinh", "Quản lý tin phản hồi"].includes(route.name)
        );

  return (
    <div className="w-1/6">
      <aside className="w-1/6 bg-gray-900 text-white min-h-screen py-6 fixed top-0 left-0 h-screen pt-24 overflow-y-auto">
        <nav>
          <ul>
            {filteredRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
               
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
