import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../layout/header';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.authReducer);

  const adminRoutes = [
    { path: '/account-manager', name: 'Quản lý tài khoản' },
    { path: '/academic-manager', name: 'Quản lý bậc học' },
    { path: '/subject-manager', name: 'Quản lý môn học' },
    { path: '/college-exam-group-manager', name: 'Quản lý nhóm môn' },
    { path: '/admission-student-manager', name: 'Quản lý tuyển sinh' },
    { path: '/evaluation-manager', name: 'Quản lý phương thức tuyển sinh' },
    { path: '/major-manager', name: 'Quản lý ngành học' },
    { path: '/news-manager', name: 'Quản lý tin tức' },
    { path: '/type-news-manager', name: 'Quản lý loại tin tức' },
    { path: '/feedback-manager', name: 'Quản lý tin phản hồi' },
    { path: '/location-manager', name: 'Quản lý địa điểm' },
  ];

  const userRoutes = [
    { path: '/admission-student-manager', name: 'Quản lý tuyển sinh' },
    { path: '/news-manager', name: 'Quản lý tin tức' },
    { path: '/feedback-manager', name: 'Quản lý tin phản hồi' },
  ];

  const routes = user?.role === "root" ? adminRoutes  :userRoutes ;



  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className=" pt-20 flex justify-center">
        <main className="w-full min-h-screen h-screen pt-20 overflow-y-auto ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center space-y-4 hover:bg-gray-200 cursor-pointer transition"
              >
                <div className="text-5xl text-black">
                  {/* Placeholder for icon */}
                  <i className="fas fa-wallet"></i>
                </div>
                <span className="text-lg font-medium text-black">
                  {route.name}
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
