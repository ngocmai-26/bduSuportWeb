import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { patchHandbook } from "../../../thunks/HandbookThunk";

function UpdateHandbookModal({ show, handleClose, item }) {
  const dispatch = useDispatch();

  const [handbook, setHandbook] = useState({
    name: "",
    link: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    link: "",
  });

  useEffect(() => {
    if (item) {
      setHandbook({
        name: item?.name || "",
        link: item?.link || "",
      });
    }
  }, [item]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", link: "" };

    if (!handbook.name.trim()) {
      newErrors.name = "Tên không được bỏ trống";
      valid = false;
    }
    if (!handbook.link.trim()) {
      newErrors.link = "Link không được bỏ trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(
        patchHandbook({
          id: item.id,
          data: handbook,
        })
      ).then(() => {
        handleClose(); // Đóng modal sau khi cập nhật thành công
      });
    }
  };

  const handleCloseModal = () => {
    setHandbook({
      name: item?.name || "",
      link: item?.link || "",
    });
    setErrors({ name: "", link: "" });
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cập nhật sổ tay</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            {/* Input Tên */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                name="name"
                value={handbook.name}
                onChange={(e) =>
                  setHandbook({ ...handbook, name: e.target.value })
                }
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>

            {/* Input Link */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                name="link"
                value={handbook.link}
                onChange={(e) =>
                  setHandbook({ ...handbook, link: e.target.value })
                }
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {errors.link && (
                <span className="text-xs text-red-500">{errors.link}</span>
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

export default UpdateHandbookModal;
