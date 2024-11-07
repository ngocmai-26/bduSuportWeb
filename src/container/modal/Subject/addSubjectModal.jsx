import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { createSubject } from "../../../thunks/SubjectThunks";

function AddSubjectModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState({});
  const { status } = useSelector(
    (state) => state.subjectsReducer
  );
  
  const handleSubmit = () => {
    dispatch(createSubject(subject)).then((reps) => {
      handleClose();
      setSubject({})
      
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm môn học</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên môn học
              </label>

              <FormField
                name={"name"}
                values={subject}
                id={"name"}
                setValue={setSubject}
                required={"required"}
              />
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

export default AddSubjectModal;
