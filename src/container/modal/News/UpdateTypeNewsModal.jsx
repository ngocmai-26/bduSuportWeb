import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState, useEffect } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { updateTypeNews, getTypeNews } from "../../../thunks/NewsThunks";

function UpdateTypeNewsModal({ show, handleClose, typeNewsId }) {
  const dispatch = useDispatch();
  const { typeNews } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    if (typeNews.length <= 0) {
      dispatch(getTypeNews());
    }
  }, [dispatch, typeNews.length]);

  const [typeNewsData, setTypeNewsData] = useState({});

  useEffect(() => {
    const selectedTypeNews = typeNews.find((news) => news.id === typeNewsId);
    if (selectedTypeNews) {
      setTypeNewsData(selectedTypeNews);
    }
  }, [typeNews, typeNewsId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTypeNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateTypeNews(typeNewsData)).then((res) => {
      handleClose();
    });
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleClose}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Cập nhật loại tin tức
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Loại tin tức
              </label>
              <FormField
                name="name"
                values={typeNewsData}
                id="name"
                setValue={setTypeNewsData}
                required="required"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <div className="flex justify-end">
                <ButtonComponent
                  textButton="Cập nhât"
                  style={
                    "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }
                  handleClick={handleSubmit}
                  type={"button"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTypeNewsModal;
