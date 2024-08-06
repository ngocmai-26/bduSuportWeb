import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useLayoutEffect, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { createMajor } from "../../../thunks/MajorThunks";
import { getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";
import { getAllAcademic } from "../../../thunks/AcademicThunks";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";

function AddMajorModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    code: "",
    name: "",
    expected_target: 0,
    college_exam_groups: [],
    description: "",
    year: 0,
    benchmark_30: 30,
    benchmark_competency_assessment_exam: 0,
    tuition_fee: 0,
    training_location: "",
    academic_level: 0,
    evaluation_methods: []
  });

  const { allCollegeExamGroups } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );

  const { allAcademic } = useSelector(
    (state) => state.academicsReducer
  );

  const { allEvaluation } = useSelector(
    (state) => state.evaluationReducer
  );

  useLayoutEffect(() => {
    if (allCollegeExamGroups.length <= 0) {
      dispatch(getAllCollegeExamGroup());
    }
  }, [ ]);

  useLayoutEffect(() => {
    if (allAcademic.length <= 0) {
      dispatch(getAllAcademic());
    }
  }, [ ]);
  useLayoutEffect(() => {
    if (allEvaluation.length <= 0) {
      dispatch(getAllEvaluation());
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCollegeExamGroupChange = (groupId) => {
    setData((prevData) => {
      const college_exam_groups = prevData.college_exam_groups.includes(groupId)
        ? prevData.college_exam_groups.filter((id) => id !== groupId)
        : [...prevData.college_exam_groups, groupId];
      return { ...prevData, college_exam_groups };
    });
  };

  const handleEvaluationMethodsChange = (method) => {
    setData((prevData) => {
      const evaluation_methods = prevData.evaluation_methods.includes(method)
        ? prevData.evaluation_methods.filter((m) => m !== method)
        : [...prevData.evaluation_methods, method];
      return { ...prevData, evaluation_methods };
    });
  };

  const handleSubmit = () => {
    dispatch(createMajor(data)).then((res) => {
      if (!res.error) {
        handleClose();
      }
    });
  };

  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm ngành học</h2>
          <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200" onClick={handleClose}>
            X
          </button>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mã ngành</label>
                <FormField
                  name="code"
                  values={data}
                  id="code"
                  setValue={setData}
                  required="required"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên ngành</label>
                <FormField
                  name="name"
                  values={data}
                  id="name"
                  setValue={setData}
                  required="required"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Chỉ tiêu</label>
                <FormField
                  name="expected_target"
                  values={data}
                  id="expected_target"
                  setValue={setData}
                  required="required"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Năm</label>
                <FormField
                  name="year"
                  values={data}
                  id="year"
                  setValue={setData}
                  required="required"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tổ hợp</label>
              <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
                {allCollegeExamGroups.map((group) => (
                  <div key={group.id}>
                    <label>
                      <input
                        type="checkbox"
                        className="mx-3"
                        value={group.id}
                        checked={data.college_exam_groups.includes(group.id)}
                        onChange={() => handleCollegeExamGroupChange(group.id)}
                      />
                      {group.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mô tả</label>
              <FormField
                name="description"
                values={data}
                id="description"
                setValue={setData}
                required="required"
                onChange={handleChange}
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Điểm chuẩn</label>
                <FormField
                  name="benchmark_30"
                  values={data}
                  id="benchmark_30"
                  setValue={setData}
                  required="required"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Điểm đánh giá năng lực</label>
                <FormField
                  name="benchmark_competency_assessment_exam"
                  values={data}
                  id="benchmark_competency_assessment_exam"
                  setValue={setData}
                  required="required"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Học phí</label>
                <FormField
                  name="tuition_fee"
                  values={data}
                  id="tuition_fee"
                  setValue={setData}
                  required="required"
                  type="number"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Địa điểm đào tạo</label>
                <select
                  name="training_location"
                  id="training_location"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  value={data.training_location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn địa điểm đào tạo</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Cà Mau">Cà Mau</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Trình độ học vấn</label>
              <select
                name="academic_level"
                id="academic_level"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                value={data.academic_level}
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
              <label className="block text-sm font-medium text-gray-700">Phương pháp đánh giá</label>
              <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
                {allEvaluation?.map((method) => (
                  <div key={method.code}>
                    <label>
                      <input
                        type="checkbox"
                        className="mx-3"
                        value={method.code}
                        checked={data.evaluation_methods.includes(method.code)}
                        onChange={() => handleEvaluationMethodsChange(method.code)}
                      />
                      {method.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <ButtonComponent
                textButton="Tạo ngành học"
              className="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              handleClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMajorModal;
