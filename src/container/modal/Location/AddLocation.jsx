import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { AddLocationThunk } from "../../../thunks/LocationThunk";

function AddLocationModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let formErrors = {};
    if (!location.name) formErrors.name = "Địa điểm không được bỏ trống";
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      dispatch(AddLocationThunk(location)).then(() => {
        handleClose();
        setLocation({ name: "" });
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setLocation({});
    setErrors({});  
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm địa chỉ</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa điểm
              </label>

              <FormField
                name={"name"}
                values={location}
                id={"name"}
                setValue={setLocation}
                required={"required"}
                errors={errors} // Pass the entire errors object
              />
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton={
                  "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
                handleClick={handleSubmit}
                type={"button"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLocationModal;
