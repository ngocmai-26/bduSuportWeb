import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormField } from "../../component/FormField";
import ButtonComponent from "../../component/ButtonComponent";
import { AddTypeNews } from "../../../thunks/NewsThunks";

function AddTypeNewsModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [typeNews, setTypeNews] = useState({
    name: "", // Initialize with a default value for the name
  });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  // Handle form submission
  const handleSubmit = () => {
    let formErrors = {}; // Object to store errors

    // Validate the form fields
    if (!typeNews.name.trim()) {
      formErrors.name = "Loại tin tức không được để trống";
    }

    // If there are any errors, update the errors state and return early
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Dispatch AddTypeNews action if no errors
    dispatch(AddTypeNews(typeNews)).then(() => {
      handleClose(); // Close the modal after successful submission
      setTypeNews({ name: "" }); // Clear the form data
      setErrors({}); // Reset errors
    });
  };

  const handleCloseModal = () => {
    handleClose();
    setTypeNews({});
    setErrors({});  // Reset formErrors khi đóng modal
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm loại tin tức</h2>
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

              {/* FormField component for the input */}
              <FormField
                name="name"
                values={typeNews}
                id="name"
                setValue={setTypeNews}
                errors={errors} // Pass error to the FormField component
       
              />
              
            </div>

            <div className="flex justify-end">
              {/* ButtonComponent for submitting */}
              <ButtonComponent
                textButton="Tạo mới"
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

export default AddTypeNewsModal;
