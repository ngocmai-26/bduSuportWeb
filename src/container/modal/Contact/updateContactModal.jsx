import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { patchContact } from "../../../thunks/ContactThunks";
import { getLocationThunk } from "../../../thunks/LocationThunk";
import { setAlert } from "../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../constants/toast";

function UpdateContactModal({ show, handleClose, item }) {
  const dispatch = useDispatch();
  const { allLocation } = useSelector((state) => state.locationReducer);

  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const hasFetched = useRef(false);

  useLayoutEffect(() => {
    if (!hasFetched.current && allLocation.length <= 0) {
      hasFetched.current = true;
      dispatch(getLocationThunk({ page: 1 }));
    }
  }, [allLocation.length, dispatch]);

  useEffect(() => {
    setContact({});
    setErrors({
      name: "",
      phone: "",
      location: "",
    });
  }, [item]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", phone: "", location: "" };

    if ("name" in contact && !contact.name.trim()) {
      newErrors.name = "Tên không được bỏ trống";
      valid = false;
    }
    if ("phone" in contact && !contact.phone.trim()) {
      newErrors.phone = "Số điện thoại không được bỏ trống";
      valid = false;
    }
    if ("location" in contact && !String(contact.location).trim()) {
      newErrors.location = "Địa điểm không được bỏ trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value !== item[name] ? value : undefined,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setContact((prev) => ({
      ...prev,
      location: parseInt(value) !== item.location ? parseInt(value) : undefined,
    }));
  };

  const handleSubmit = () => {
    const updatedData = Object.fromEntries(
      Object.entries(contact).filter(([_, value]) => value !== undefined)
    );

    if (validate() && Object.keys(updatedData).length > 0) {
      dispatch(
        patchContact({
          id: item.id,
          data: updatedData,
        })
      ).then(() => {
        handleClose();
      });
    } else if (Object.keys(updatedData).length === 0) {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: "Dữ liệu không có thay đổi" })
      );
    }
  };

  const handleCloseModal = () => {
    setContact({});
    setErrors({
      name: "",
      phone: "",
      location: "",
    });
    handleClose();
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
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Cập nhật liên hệ
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên liên hệ
              </label>
              <input
                name="name"
                defaultValue={item?.name || ""}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                name="phone"
                defaultValue={item?.phone || ""}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.phone && (
                <span className="text-xs text-red-500">{errors.phone}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa điểm
              </label>
              <select
                name="location"
                defaultValue={item?.location || contact?.location || ""}
                onChange={handleSelectChange}
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

export default UpdateContactModal;
