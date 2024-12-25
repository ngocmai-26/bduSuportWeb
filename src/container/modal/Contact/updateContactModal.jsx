import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { patchContact } from "../../../thunks/ContactThunks";

function UpdateContactModal({ show, handleClose, item }) {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (item) {
      setContact({
        name: item?.name || "",
        phone: item?.phone || "",
        location: item?.location || "",
      });
    }
  }, [item]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", phone: "", location: "" };

    if (!contact.name.trim()) {
      newErrors.name = "Tên không được bỏ trống";
      valid = false;
    }
    if (!contact.phone.trim()) {
      newErrors.phone = "Số điện thoại không được bỏ trống";
      valid = false;
    }
    if (!String(contact.location).trim()) {
      newErrors.location = "Địa điểm không được bỏ trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(
        patchContact({
          id: item.id,
          data: contact,
        })
      ).then(() => {
        handleClose(); // Đóng modal sau khi cập nhật thành công
      });
    }
  };

  const handleCloseModal = () => {
    setContact({
      name: item?.name || "",
      phone: item?.phone || "",
      location: item?.location || "",
    });
    setErrors({ name: "", phone: "", location: "" });
    handleClose();
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cập nhật liên hệ</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            {/* Input Tên liên hệ */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên liên hệ
              </label>
              <input
                name="name"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>

            {/* Input Số điện thoại */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                name="phone"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.phone && (
                <span className="text-xs text-red-500">{errors.phone}</span>
              )}
            </div>

            {/* Input Địa điểm */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa điểm
              </label>
              <input
                name="location"
                value={contact.location}
                onChange={(e) =>
                  setContact({ ...contact, location: e.target.value })
                }
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.location && (
                <span className="text-xs text-red-500">{errors.location}</span>
              )}
            </div>

            {/* Nút cập nhật */}
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Cập nhật"
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

export default UpdateContactModal;
