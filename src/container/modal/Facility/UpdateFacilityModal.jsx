import { useState, useEffect } from "react";
import { updateFacilityThunk } from "../../../thunks/FacilityThunks";
import { useDispatch } from "react-redux";
import ButtonComponent from "../../component/ButtonComponent";
import { FormField } from "../../component/FormField";

function UpdateFacilityModal({ show, handleClose, facility }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [initialData, setInitialData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (facility) {
      const data = {
        id: facility.id,
        name: facility.name,
        description: facility.description,
      };
      setFormData(data);
      setInitialData(data);
    }
  }, [facility]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (formData.name !== initialData.name) {
        data.append("name", formData.name);
      }
      if (formData.description !== initialData.description) {
        data.append("description", formData.description);
      }
      if ([...data.entries()].length === 0) {
        handleCloseModal();
        return;
      }
      data.append('id', facility.id);
      dispatch(updateFacilityThunk(data)).then(() => {
        handleCloseModal();
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setFormData({});
    setErrors({});
  };

  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={handleCloseModal}></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cập nhật cơ sở vật chất</h2>
          <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200" onClick={handleCloseModal}>X</button>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên</label>
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
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
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
                textButton="Cập nhật"
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

export default UpdateFacilityModal; 