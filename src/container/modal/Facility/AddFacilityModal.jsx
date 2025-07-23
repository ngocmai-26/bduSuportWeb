import { useState } from "react";
import { addFacilityThunk } from "../../../thunks/FacilityThunks";
import { FormField } from "../../component/FormField";
import { useDispatch } from "react-redux";
import ButtonComponent from "../../component/ButtonComponent";

function AddFacilityModal({ show, handleClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Tên là bắt buộc";
    if (!formData.description) formErrors.description = "Mô tả là bắt buộc";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      dispatch(addFacilityThunk(data)).then(() => {
        handleCloseModal();
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setFormData({
      name: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"
        }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Thêm cơ sở vật chất
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên
                </label>
                <FormField
                  name="name"
                  values={formData}
                  id="name"
                  setValue={setFormData}
                  onChange={handleChange}
                  errors={errors}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <FormField
                  name="description"
                  values={formData}
                  id="description"
                  setValue={setFormData}
                  onChange={handleChange}
                  errors={errors}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton={
                  "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFacilityModal; 