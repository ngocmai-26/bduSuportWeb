import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useLayoutEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { AddLocationThunk, getLocationThunk } from "../../../thunks/LocationThunk";
import { AddContactThunk } from "../../../thunks/ContactThunks";

function AddContactModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", phone: "", location: "" });
  const [errors, setErrors] = useState({});
  const { allLocation } = useSelector((state) => state.locationReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (!hasFetched.current && allLocation.length <= 0) {
      hasFetched.current = true;
      dispatch(getLocationThunk());
    }
  }, [allLocation.length, dispatch]);

  // Validation function
  const validate = () => {
    let formErrors = {};
    if (!data.name) formErrors.name = "Tên không được bỏ trống";
    if (!data.phone) formErrors.phone = "Số điện thoại không được bỏ trống";
    if (!data.location) formErrors.location = "Vui lòng chọn địa điểm";
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      dispatch(AddContactThunk(data)).then(() => {
        handleClose();
        setData({ name: "", phone: "", location: "" });
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setData({ name: "", phone: "", location: "" });
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
                Số điện thoại
              </label>
              <FormField
                name="phone"
                values={data}
                id="phone"
                setValue={setData}
                required="required"
                errors={errors}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa điểm
              </label>
              <select
                name="location"
                id="location"
                value={data.location}
                onChange={(e) =>
                  setData((prevData) => ({ ...prevData, location: parseInt(e.target.value) }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Chọn địa điểm</option>
                {allLocation.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-sm text-red-600">{errors.location}</p>
              )}
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

export default AddContactModal;
