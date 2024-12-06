import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useLayoutEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { getAllSubject } from "../../../thunks/SubjectThunks";
import { createCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";

function AddCollegeExamGroupModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ code: "", name: "", subjects: [] });
  const [errors, setErrors] = useState({}); 
  const { allSubject } = useSelector((state) => state.subjectsReducer);
  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allSubject.length <= 0 && !hasFetched.current) {
      dispatch(getAllSubject());
    }
  }, [allSubject.length, hasFetched, dispatch]);


  const handleSubjectChange = (subjectId) => {
    setData((prevData) => {
      const subjects = prevData.subjects.includes(subjectId)
        ? prevData.subjects.filter((id) => id !== subjectId)
        : [...prevData.subjects, subjectId];
      return { ...prevData, subjects };
    });
  };

  // Validation function
  const validate = () => {
    let formErrors = {};
    
    // Check if code and name are filled
    if (!data.code) formErrors.code = "Mã khối không được bỏ trống";
    if (!data.name) formErrors.name = "Tên khối không được bỏ trống";
    
    // Check if at least one subject is selected
    if (data.subjects.length === 0) formErrors.subjects = "Bạn phải chọn ít nhất một môn thi";
    
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    setErrors(formErrors);

    // If no errors, dispatch the action
    if (Object.keys(formErrors).length === 0) {
      dispatch(createCollegeExamGroup(data)).then((res) => {
        handleClose();
        setData({ code: "", name: "", subjects: [] });
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setData({ code: "", name: "", subjects: [] });
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Thêm khối thi đại học
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
                Mã khối
              </label>
              <FormField
                name="code"
                values={data}
                id="code"
                setValue={setData}
                required={true}
                errors={errors} // Pass error message here
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên khối
              </label>
              <FormField
                name="name"
                values={data}
                id="name"
                setValue={setData}
                required={true}
                errors={errors} // Pass error message here
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Môn thi
              </label>
              <div className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm h-40 overflow-y-auto">
                {allSubject.map((subject) => (
                  <div key={subject.id}>
                    <label>
                      <input
                        type="checkbox"
                        className="mx-3"
                        value={subject.id}
                        checked={data.subjects.includes(subject.id)}
                        onChange={() => handleSubjectChange(subject.id)}
                      />
                      {subject.name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.subjects && (
                <p className="text-red-500 text-sm">{errors.subjects}</p>
              )}
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton={
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

export default AddCollegeExamGroupModal;
