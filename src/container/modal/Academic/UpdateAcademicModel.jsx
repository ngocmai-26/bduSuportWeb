import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateAcademy } from "../../../thunks/AcademicThunks";
import ButtonComponent from "../../component/ButtonComponent";
import { setAlert } from "../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../constants/toast";
function UpdateAcademicModal({ show, handleClose, item }) {
  const dispatch = useDispatch();

  const [academic, setAcademic] = useState({}); // Chỉ lưu các trường thay đổi
  const [errors, setErrors] = useState({
    name: "",
    need_evaluation_method: "",
  });

  useEffect(() => {
    // Reset trạng thái khi item thay đổi
    setAcademic({});
    setErrors({});
  }, [item]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", need_evaluation_method: "" };

    if ("name" in academic && !academic.name.trim()) {
      newErrors.name = "Tên bậc học không được bỏ trống";
      valid = false;
    }

    if (
      "need_evaluation_method" in academic &&
      academic.need_evaluation_method === ""
    ) {
      newErrors.need_evaluation_method = "Vui lòng chọn cần xét tuyển hay không";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (Object.keys(academic).length > 0) {
        dispatch(updateAcademy({ id: item.id, data: academic })).then(() => {
          handleClose(); // Đóng modal sau khi cập nhật thành công
        });
      } else {
        // Không có trường nào thay đổi, chỉ đóng modal
        dispatch(
                      setAlert({ type: TOAST_ERROR, content: "Dữ liệu không có thay đổi" })
                    );
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAcademic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setAcademic((prev) => ({
      ...prev,
      need_evaluation_method: e.target.value === "true", // Chuyển đổi string thành boolean
    }));
  };

  const handleCloseModal = () => {
    setAcademic({});
    setErrors({}); // Reset lỗi
    handleClose(); // Đóng modal
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cập nhật bậc học</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            {/* Input Tên bậc học */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên bậc học
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

            {/* Select Cần xét tuyển hay không */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cần xét tuyển hay không
              </label>
              <select
                name="need_evaluation_method"
                value={academic.need_evaluation_method?.toString() || item?.need_evaluation_method?.toString() || ""}
                onChange={handleSelectChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Chọn giá trị</option>
                <option value="false">Không cần</option>
                <option value="true">Cần</option>
              </select>
              {errors.need_evaluation_method && (
                <span className="text-xs text-red-500">
                  {errors.need_evaluation_method}
                </span>
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

export default UpdateAcademicModal;
