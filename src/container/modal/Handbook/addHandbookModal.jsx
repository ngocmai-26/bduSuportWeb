import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { AddLocationThunk } from "../../../thunks/LocationThunk";
import { AddHandbookThunk } from "../../../thunks/HandbookThunk";

function AddHandbookModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", link: "" });
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let formErrors = {};
    if (!data.name) formErrors.name = "Tên không được bỏ trống";
    if (!data.link) formErrors.link = "Liên kết không được bỏ trống";
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      dispatch(AddHandbookThunk(data)).then(() => {
        handleClose();
        setData({ name: "", link: "" });
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setData({ name: "", link: "" });
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm thông tin</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <FormField
                name="name"
                values={data}
                id="name"
                setValue={setData}
                required="required"
                errors={errors}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Liên kết
              </label>
              <FormField
                name="link"
                values={data}
                id="link"
                setValue={setData}
                required="required"
                errors={errors}
              />
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton={
                  "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
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

export default AddHandbookModal;
