import { useLayoutEffect, useState, useEffect } from "react";
import { updateNewsThunk, getTypeNews, getNewsByIdThunk } from "../../../thunks/NewsThunks";
import { FormField } from "../../component/FormField";
import { useDispatch, useSelector } from "react-redux";

function UpdateNewsModal({ show, handleClose, newsId }) {
  const dispatch = useDispatch();
  const { allNews, typeNews } = useSelector((state) => state.newsReducer);
  const [newsData, setNewsData] = useState({});


  useEffect(() => {
    const selectedNews = allNews.find((news) => news.id === newsId);
    if (selectedNews) {
      setNewsData(selectedNews);
    }
  }, [allNews, newsId]);

  useLayoutEffect(() => {
    dispatch(getTypeNews());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewsData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (newsData) {
      dispatch(updateNewsThunk(newsData)).then((res) => {
        handleClose();
        setNewsData({
        });
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleClose}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Cập nhật tin tức
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiêu đề
                </label>
                <FormField
                  name="title"
                  values={newsData}
                  id="title"
                  setValue={setNewsData}
                  required="required"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Đường dẫn
                </label>
                <FormField
                  name="link"
                  values={newsData}
                  id="link"
                  setValue={setNewsData}
                  required="required"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loại
                </label>
                <select
                  name="type"
                  id="type"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  value={newsData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn loại tin tức</option>
                  {typeNews.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              type="submit"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateNewsModal;
