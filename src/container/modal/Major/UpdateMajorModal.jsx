import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useEffect, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";
import { getAllAcademic } from "../../../thunks/AcademicThunks";
import { updateMajor } from "../../../thunks/MajorThunks";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";

function UpdateMajorModal({ show, handleClose, initialData }) {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData || {});

  const { allCollegeExamGroups } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );

  const { allAcademic } = useSelector(
    (state) => state.academicsReducer
  );

  const { allEvaluation } = useSelector(
    (state) => state.evaluationReducer
  );

  useEffect(() => {
    if (allCollegeExamGroups.length <= 0) {
      dispatch(getAllCollegeExamGroup());
    }
    if (allAcademic.length <= 0) {
      dispatch(getAllAcademic());
    }
    if (allEvaluation.length <= 0) {
      dispatch(getAllEvaluation());
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        college_exam_groups: initialData.college_exam_groups.map(group => group.id),
      };
      setData(formattedData);
    }
  }, [initialData]);
  console.log('initialData', data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCollegeExamGroupChange = (groupId) => {
    setData((prevData) => {
      const updatedGroups = [...prevData.college_exam_groups];
      const groupIndex = updatedGroups.indexOf(groupId);
      if (groupIndex !== -1) {
        updatedGroups.splice(groupIndex, 1); 
      } else {
        updatedGroups.push(groupId); 
      }
      console.log("college_exam_groups",prevData.college_exam_groups)
      return { ...prevData, college_exam_groups: updatedGroups };
    });
  };

  const handleEvaluationMethodsChange = (method) => {
    setData((prevData) => {
      const updatedMethods = [...prevData.evaluation_methods];
      const methodIndex = updatedMethods.indexOf(method);
      if (methodIndex !== -1) {
        updatedMethods.splice(methodIndex, 1); // Xóa method nếu đã tồn tại
      } else {
        updatedMethods.push(method); // Thêm method nếu chưa tồn tại
      }
      return { ...prevData, evaluation_methods: updatedMethods };
    });
  };

  const handleSubmit = () => {
    dispatch(updateMajor({id: data.code, data: data})).then((res) => {
      if (!res.error) {
        handleClose();
      }
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
        <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Cập nhật ngành học
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mã ngành
                </label>
                <FormField
                  name="code"
                  setValue={setData}
                  values={data}
                  id="code"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên ngành
                </label>
                <FormField
                  name="name"
                  setValue={setData}
                  values={data}
                  id="name"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Chỉ tiêu
                </label>
                <FormField
                  name="expected_target"
                  setValue={setData}
                  values={data}
                  id="expected_target"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Năm
                </label>
                <FormField
                  name="year"
                  setValue={setData}
                  values={data}
                  id="year"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tổ hợp
              </label>
              <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
                {allCollegeExamGroups.map((group) => (
                  <div key={group.id}>
                    <label>
                      <input
                        type="checkbox"
                        className="mx-3"
                        value={group.id}
                        checked={data?.college_exam_groups?.some(item => group.id === item)}
                        onChange={() => handleCollegeExamGroupChange(group.id)}
                      />
                      {group.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trình độ học vấn
              </label>
              <select
                name="academic_level"
                id="academic_level"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                value={data?.academic_level}
                onChange={handleChange}
                required
              >
                <option value="">Chọn trình độ học vấn</option>
                {allAcademic.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phương pháp đánh giá
              </label>
              <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
                
                {allEvaluation.map((group) => (
                  <div key={group.code}>
                    <label>
                      <input
                        type="checkbox"
                        className="mx-3"
                        value={group.code}
                        checked={data?.evaluation_methods?.some(item => group.code === item)}
                        onChange={() => handleEvaluationMethodsChange(group.code)}
                      />
                      {group.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <FormField
                name="description"
                setValue={setData}
                values={data}
                id="description"
                onChange={handleChange}
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Điểm chuẩn
                </label>
                <FormField
                  name="benchmark_30"
                  setValue={setData}
                  values={data}
                  id="benchmark_30"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Điểm đánh giá năng lực
                </label>
                <FormField
                  name="benchmark_competency_assessment_exam"
                  setValue={setData}
                  values={data}
                  id="benchmark_competency_assessment_exam"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Học phí
                </label>
                <FormField
                  name="tuition_fee"
                  setValue={setData}
                  values={data}
                  id="tuition_fee"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa điểm đào tạo
                </label>
                <select
                  name="training_location"
                  id="training_location"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  value={data?.training_location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn địa điểm đào tạo</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Cà Mau">Cà Mau</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Lưu"
                style="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default UpdateMajorModal;
