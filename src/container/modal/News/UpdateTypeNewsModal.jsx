import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState, useEffect } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { updateTypeNews, getTypeNews } from "../../../thunks/NewsThunks";
import { setAlert } from "../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../constants/toast";

function UpdateTypeNewsModal({ show, handleClose, typeNewsId }) {
  const dispatch = useDispatch();
  const { typeNews } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    if (typeNews.length <= 0) {
      dispatch(getTypeNews({page: 1}));
    }
  }, [dispatch, typeNews.length]);

  const [typeNewsData, setTypeNewsData] = useState({});
  const [initialTypeNewsData, setInitialTypeNewsData] = useState({}); // To store the initial state for resetting

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const selectedTypeNews = typeNews.find((news) => news.id === typeNewsId);
    if (selectedTypeNews) {
      setTypeNewsData(selectedTypeNews);
      setInitialTypeNewsData(selectedTypeNews); // Save the initial data for resetting
    }
  }, [typeNews, typeNewsId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTypeNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function
  const validate = () => {
    let formErrors = {}; // Object to store errors

    // Validate name field (required)
    if (!typeNewsData.name || typeNewsData.name.trim() === "") {
      formErrors.name = "Loại tin tức không được để trống";
    }

    // Return formErrors object if there are errors
    return formErrors;
  };
  const handleSubmit = () => {
    // Perform validation
    const formErrors = validate();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set errors if validation fails
      return; // Do not proceed if there are validation errors
    }
  
    // Kiểm tra sự thay đổi giữa typeNewsData và initialTypeNewsData
    const isDataChanged = Object.keys(typeNewsData).some(
      (key) => typeNewsData[key] !== initialTypeNewsData[key]
    );
  
    if (isDataChanged) {
      // Nếu có thay đổi, dispatch cập nhật
      dispatch(updateTypeNews(typeNewsData)).then(() => {
        handleClose();
        setTypeNewsData(initialTypeNewsData); // Reset to initial state after successful update
        setErrors({}); // Reset errors after successful submission
      });
    } else {
      // Nếu không có thay đổi, dispatch cảnh báo
      dispatch(setAlert({ type: TOAST_ERROR, content: "Dữ liệu không có thay đổi" }));
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setTypeNewsData(initialTypeNewsData); // Reset to initial state when closing the modal
    setErrors({}); // Reset errors when closing the modal
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cập nhật loại tin tức</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
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
                id="nameUpdate"
                setValue={setTypeNewsData}
                required="required"
                onChange={handleChange}
                errors={errors} // Pass errors to FormField
              />
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Cập nhật"
                styleButton="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                handleClick={handleSubmit}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTypeNewsModal;
