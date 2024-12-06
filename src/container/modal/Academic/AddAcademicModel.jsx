import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAcademic } from "../../../thunks/AcademicThunks";
import ButtonComponent from "../../component/ButtonComponent";
import { FormField } from "../../component/FormField";

function AddAcademicModal({ show, handleClose }) {
  const dispatch = useDispatch();

  // State lưu trữ dữ liệu bậc học
  const [academic, setAcademic] = useState({
    name: "",
    need_evaluation_method: "", // Luôn có giá trị mặc định
  });

  // State lưu trữ lỗi
  const [errors, setErrors] = useState({
    name: "",
    need_evaluation_method: "",
  });

  // Hàm validate dữ liệu đầu vào
  const validate = () => {
    let valid = true;
    const newErrors = { name: "", need_evaluation_method: "" };

    if (!academic.name.trim()) {
      newErrors.name = "Tên bậc học không được bỏ trống";
      valid = false;
    }

    if (academic.need_evaluation_method === "") {
      newErrors.need_evaluation_method = "Vui lòng chọn cần xét tuyển hay không";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Hàm xử lý khi nhấn nút Tạo mới
  const handleSubmit = () => {
    if (validate()) {
      dispatch(createAcademic(academic)).then(() => {
        setAcademic({
          name: "",
          need_evaluation_method: "",
        });
        handleClose();
      });
    }
  };

  // Hàm xử lý khi thay đổi giá trị của select
  const handleSelectChange = (e) => {
    setAcademic({
      ...academic,
      need_evaluation_method: JSON.parse(e.target.value), // Chuyển string thành boolean
    });
  };

  // Hàm đóng modal và reset dữ liệu
  const handleCloseModal = () => {
    handleClose();
    setAcademic({
      name: "",
      need_evaluation_method: "",
    });
    setErrors({
      name: "",
      need_evaluation_method: "",
    });
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm bậc học</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            {/* Input tên bậc học */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên bậc học
              </label>
              <FormField
                name="name"
                values={academic}
                id="name"
                setValue={setAcademic}
                required="required"
                errors={errors}
              />
            </div>

            {/* Select cần xét tuyển hay không */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cần xét tuyển hay không
              </label>
              <select
                name="need_evaluation_method"
                id="need_evaluation_method"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                value={academic.need_evaluation_method} // Bảo đảm luôn được điều khiển
                onChange={handleSelectChange}
                required
              >
                <option value="">Chọn giá trị</option>
                <option value={false}>Không cần</option>
                <option value={true}>Cần</option>
              </select>
              {errors.need_evaluation_method && (
                <span className="text-xs text-red-500">
                  {errors.need_evaluation_method}
                </span>
              )}
            </div>

            {/* Nút Tạo mới */}
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

export default AddAcademicModal;
