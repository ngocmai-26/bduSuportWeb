import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/header';
import { loadAuthInfoFromStorage } from '../../services/AuthService';
import { INFO_KEY_NAME } from '../../constants/api';

function HomePage() {
  const navigate = useNavigate();
  const user = loadAuthInfoFromStorage(INFO_KEY_NAME);

  // Cấu hình route với icon
  const adminRoutes = [
    { path: '/account-manager', name: 'Quản lý tài khoản', icon: 'https://ecomstone.com/wp-content/uploads/2021/05/icon-ecomstone-2.png' },
    { path: '/academic-manager', name: 'Quản lý bậc học', icon: 'https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-graduation-bachelor-hat-illustration-png-image_6580811.png' },
    { path: '/subject-manager', name: 'Quản lý môn học', icon: 'https://www.clipartmax.com/png/full/87-876167_icon-book-note-dairy-book-book-book-book-b-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-cu%E1%BB%91n.png' },
    { path: '/college-exam-group-manager', name: 'Quản lý nhóm môn', icon: 'https://img.pikbest.com/origin/09/24/25/99YpIkbEsTFsU.png!sw800' },
    { path: '/admission-student-manager', name: 'Quản lý tuyển sinh', icon: 'https://png.pngtree.com/recommend-works/png-clipart/20241030/ourmid/pngtree-male-student-icon-graduating-png-image_14211323.png' },
    { path: '/evaluation-manager', name: 'Quản lý phương thức tuyển sinh', icon: 'https://png.pngtree.com/png-vector/20221119/ourmid/pngtree-red-yellow-colorful-admission-open-banner-png-image_6470939.png' },
    { path: '/major-manager', name: 'Quản lý ngành học', icon: 'https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-majors-student-color-icon-vector-png-image_4755429.png' },
    { path: '/news-manager', name: 'Quản lý tin tức', icon: 'https://cdn-icons-png.flaticon.com/512/1295/1295674.png' },
    { path: '/type-news-manager', name: 'Quản lý loại tin tức', icon: 'https://thumbs.dreamstime.com/b/newspaper-icon-news-icon-colors-included-simple-vector-icons-set-newspaper-icon-news-icon-colors-included-110118833.jpg' },
    { path: '/feedback-manager', name: 'Quản lý tin phản hồi', icon: 'https://cdn-icons-png.freepik.com/512/7299/7299812.png' },
    { path: '/location-manager', name: 'Quản lý địa điểm', icon: 'https://png.pngtree.com/png-clipart/20230123/original/pngtree-flat-red-location-sign-png-image_8927579.png' },
    { path: '/function-manager', name: 'Quản lý chức năng', icon: 'https://cdn-icons-png.flaticon.com/512/11337/11337201.png' },
    { path: '/contact-manager', name: 'Quản lý liên hệ', icon: 'https://cdn-icons-png.freepik.com/512/5300/5300765.png' },
    { path: '/handbook-manager', name: 'Quản lý handbook', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620230.png' },
    { path: '/audit-manager', name: 'Quản lý', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620230.png' },
  ];

  const userRoutes = [
    { path: '/admission-student-manager', name: 'Quản lý tuyển sinh', icon: 'https://png.pngtree.com/recommend-works/png-clipart/20241030/ourmid/pngtree-male-student-icon-graduating-png-image_14211323.png' },
    { path: '/news-manager', name: 'Quản lý tin tức', icon: 'https://cdn-icons-png.flaticon.com/512/1295/1295674.png' },
    { path: '/feedback-manager', name: 'Quản lý tin phản hồi', icon: 'https://cdn-icons-png.freepik.com/512/7299/7299812.png' },
    
    { path: '/contact-manager', name: 'Quản lý liên hệ', icon: 'https://cdn-icons-png.freepik.com/512/5300/5300765.png' },
    { path: '/handbook-manager', name: 'Quản lý handbook', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620230.png' },
  ];

  // Lựa chọn route dựa trên vai trò của user
  const routes = user?.role === 'root' ? adminRoutes : userRoutes;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="pt-20 flex justify-center">
        <main className="w-full min-h-screen h-screen pt-20 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center space-y-4 hover:bg-gray-200 cursor-pointer transition"
              >
                <div className="flex justify-center items-center w-20 h-20">
                  <img
                    src={route.icon}
                    alt={route.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-medium text-black text-center">
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
