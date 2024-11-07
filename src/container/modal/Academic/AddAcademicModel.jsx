import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState } from "react";
import { createAcademic } from "../../../thunks/AcademicThunks";
import ButtonComponent from "../../component/ButtonComponent";

function AddAcademicModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [academic, setAcademic] = useState({
    name: "",
    need_evaluation_method: false,
  });

  const handleSubmit = () => {
    dispatch(createAcademic(academic)).then((reps) => {
      setAcademic({
        name: "",
        need_evaluation_method: false,
      });
      handleClose();
    });
  };

  const handleSelectChange = (e) => {
    setAcademic({
      ...academic,
      need_evaluation_method: e.target.value === "true", // Convert to boolean
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
          onClick={handleClose}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm bậc học</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên bậc học
              </label>

              <FormField
                name={"name"}
                values={academic}
                id={"name"}
                setValue={setAcademic}
                required={"required"}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cần xét tuyển hay không
              </label>
              <select
                name="need_evaluation_method"
                id="need_evaluation_method"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                value={academic.need_evaluation_method}
                onChange={handleSelectChange} // Use updated handleSelectChange
                required
              >
                <option value="">Chọn giá trị</option>
                <option value={false}>Không cần</option>
                <option value={true}>Cần</option>
              </select>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                style={
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

export default AddAcademicModal;
