import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/header';
import { loadAuthInfoFromStorage } from '../../services/AuthService';
import { INFO_KEY_NAME } from '../../constants/api';
import { useDispatch } from 'react-redux';
import { refreshSession } from '../../thunks/AuthThunks';

function HomePage() {
  const navigate = useNavigate();
  const user = loadAuthInfoFromStorage(INFO_KEY_NAME);
  const dispatch = useDispatch();

  // Cấu hình route với icon
  const adminRoutes = [
    { path: '/account-manager', name: 'Quản lý tài khoản', icon: 'https://cdn-icons-png.freepik.com/512/12105/12105203.png' },
    { path: '/information-student-manager', name: 'Quản lý thông tin học sinh', icon: 'https://png.pngtree.com/png-clipart/20240629/original/pngtree-line-icon-with-people-in-a-line-vector-png-image_15439451.png' },
    { path: '/academic-manager', name: 'Quản lý bậc học', icon: 'https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-graduation-bachelor-hat-illustration-png-image_6580811.png' },
    { path: '/subject-manager', name: 'Quản lý môn học', icon: 'https://png.pngtree.com/png-clipart/20230407/original/pngtree-open-book-icon-vector-illustration-clipart-design-png-image_9031608.png' },
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
    { path: '/audit-manager', name: 'Quản lý audit log', icon: 'https://cdn-icons-png.flaticon.com/512/4308/4308101.png' },
  ];

  const userRoutes = [
    { path: '/admission-student-manager', name: 'Quản lý tuyển sinh', icon: 'https://png.pngtree.com/recommend-works/png-clipart/20241030/ourmid/pngtree-male-student-icon-graduating-png-image_14211323.png' },
    { path: '/news-manager', name: 'Quản lý tin tức', icon: 'https://cdn-icons-png.flaticon.com/512/1295/1295674.png' },
    { path: '/feedback-manager', name: 'Quản lý tin phản hồi', icon: 'https://cdn-icons-png.freepik.com/512/7299/7299812.png' },
    
    { path: '/contact-manager', name: 'Quản lý liên hệ', icon: 'https://cdn-icons-png.freepik.com/512/5300/5300765.png' },
    { path: '/handbook-manager', name: 'Quản lý handbook', icon: 'https://cdn-icons-png.flaticon.com/512/2620/2620230.png' },
  ];

  useLayoutEffect(() => {
    console.log("sssss")
    dispatch(refreshSession());
  }, []);


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
