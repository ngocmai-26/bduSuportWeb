import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { createSubject } from "../../../thunks/SubjectThunks";

function AddSubjectModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState({});
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let formErrors = {};

    // Validate name field (required)
    if (!subject.name || subject.name.trim() === "") {
      formErrors.name = "Tên môn học không được để trống";
    }

    // Return the formErrors object if there are errors
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    
    // If there are validation errors, set them and prevent submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Dispatch createSubject if no errors
    dispatch(createSubject(subject)).then((res) => {
      handleClose();
      setSubject({});
      setErrors({}); // Clear errors after successful submission
    });
  };

  const handleCloseModal = () => {
    handleClose();
    setSubject({});
    setErrors({});  // Reset formErrors khi đóng modal
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm môn học</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
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
                errors={errors} // Pass errors to FormField
              />
             
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
