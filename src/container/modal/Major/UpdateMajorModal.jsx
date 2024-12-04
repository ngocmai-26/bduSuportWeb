import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useEffect, useLayoutEffect, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";
import { getAllAcademic } from "../../../thunks/AcademicThunks";
import { updateMajor } from "../../../thunks/MajorThunks";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";
import { getLocationThunk } from "../../../thunks/LocationThunk";

function UpdateMajorModal({ show, handleClose, initialData }) {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData || {});
  const [selectedAcademic, setSelectedAcademic] = useState(null);


  const { allCollegeExamGroups } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );
  const { allAcademic } = useSelector((state) => state.academicsReducer);
  const { allEvaluation } = useSelector((state) => state.evaluationReducer);
  const { allLocation } = useSelector((state) => state.locationReducer);

  useLayoutEffect(() => {
    if (allCollegeExamGroups.length <= 0) {
      dispatch(getAllCollegeExamGroup());
    }
  }, []);

  useLayoutEffect(() => {
    if (allAcademic.length <= 0) {
      dispatch(getAllAcademic());
    }
  }, []);
  useLayoutEffect(() => {
    if (allEvaluation.length <= 0) {
      dispatch(getAllEvaluation());
    }
  }, []);

  useLayoutEffect(() => {
    if (allLocation.length <= 0) {
      dispatch(getLocationThunk());
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        college_exam_groups: initialData.college_exam_groups.map(
          (group) => group.id
        ),
        evaluation_methods: initialData.evaluation_methods.map(
          (method) => method.code
        ),
      };
      setData(formattedData);
    }
  }, [initialData]);

  useEffect(() => {
    const matchedLevel = allAcademic.find(
      (level) => level.id === +data.academic_level
    );

    if (matchedLevel) {
      setSelectedAcademic(matchedLevel.need_evaluation_method);
    } else {
      setSelectedAcademic(null);
    }
  }, [data.academic_level, allAcademic]);

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
      return { ...prevData, college_exam_groups: updatedGroups };
    });
  };

  const handleEvaluationMethodsChange = (methodCode) => {
    setData((prevData) => {
      const updatedMethods = [...prevData.evaluation_methods];
      const methodIndex = updatedMethods.indexOf(methodCode);
      if (methodIndex !== -1) {
        updatedMethods.splice(methodIndex, 1);
      } else {
        updatedMethods.push(methodCode);
      }
      return { ...prevData, evaluation_methods: updatedMethods };
    });
  };

  useEffect(() => {
    if (!selectedAcademic) {
      setData((prevData) => ({
        ...prevData,
        college_exam_groups: [],
        benchmark_30: 0,
        benchmark_school_record: 0,
        benchmark_competency_assessment_exam: 0,
        evaluation_methods: [],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        college_exam_groups: initialData.college_exam_groups.map(
          (group) => group.id
        ),
        benchmark_30: initialData.benchmark_30,
        benchmark_school_record: initialData.benchmark_school_record,
        benchmark_competency_assessment_exam:
          initialData.benchmark_competency_assessment_exam,
        evaluation_methods: initialData.evaluation_methods.map(
          (method) => method.code
        ),
      }));
    }
  }, [selectedAcademic]);

  const handleSubmit = () => {
    dispatch(updateMajor({ id: initialData?.id, data: data })).then(() => {
      handleClose();
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
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">
              Cập nhật ngành học
            </h2>
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={handleClose}
            >
              X
            </button>
          </div>

          <div className="max-h-[650px] overflow-y-auto p-4">
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
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
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chỉ tiêu
                  </label>
                  <input
                  name="expected_target"
                  value={data.expected_target}
                  id="expected_target"
                  required="required"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, expected_target: +e.target.value })
                  }
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Năm
                  </label>
                  <input
                  name="year"
                  value={data.year}
                  id="year"
                  required="required"
                  type="text"
                  onChange={(e) => setData({ ...data, year: +e.target.value })}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                Chuyên ngành (nếu có) vd: Quản trị doanh nghiệp /n Quản trị Logistics
                </label>
                <FormField
                  name="description"
                  setValue={setData}
                  values={data}
                  id="description"
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
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
              {selectedAcademic && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tổ hợp
                      </label>
                      <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm h-40 overflow-y-auto">
                        {allCollegeExamGroups.map((group) => (
                          <div>
                            <label key={group.id}>
                              <input
                                type="checkbox"
                                className="mx-2"
                                value={group.id}
                                checked={data?.college_exam_groups?.some(
                                  (item) => group.id === item
                                )}
                                onChange={() =>
                                  handleCollegeExamGroupChange(group.id)
                                }
                              />
                              {group.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phương pháp đánh giá
                      </label>
                      <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm h-40 overflow-y-auto">
                        {allEvaluation.map((group) => (
                          <div>
                            <label key={group.code}>
                              <input
                                type="checkbox"
                                className="mx-2"
                                value={group.code}
                                checked={data?.evaluation_methods?.some(
                                  (item) => group.code === item
                                )}
                                onChange={() =>
                                  handleEvaluationMethodsChange(group.code)
                                }
                              />
                              {group.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Điểm chuẩn
                      </label>
                      <input
                      name="benchmark_30"
                      value={data.benchmark_30}
                      id="benchmark_30"
                      setValue={setData}
                      required="required"
                      type="text"
                      onChange={(e) =>
                        setData({ ...data, benchmark_30: +e.target.value })
                      }
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Điểm thi đánh giá năng lực
                      </label>
                      <input
                      name="benchmark_competency_assessment_exam"
                      value={data.benchmark_competency_assessment_exam}
                      id="benchmark_competency_assessment_exam"
                      required="required"
                      type="text"
                      onChange={(e) =>
                        setData({
                          ...data,
                          benchmark_competency_assessment_exam: +e.target.value,
                        })
                      }
                      className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Số tín chỉ
                      </label>
                      <input
                name="number_of_credits"
                id="number_of_credits"
                value={data.number_of_credits}
                required="required"
                type="text"
                
                onChange={(e) => setData({ ...data, number_of_credits: +e.target.value })}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Điểm hồ sơ học bạ
                      </label>
                      <input
                      name="benchmark_school_record"
                      values={data.benchmark_school_record}
                      id="benchmark_school_record"
                      setValue={setData}
                      required="required"
                      type="text"
                     
                  onChange={(e) => setData({ ...data, benchmark_school_record: +e.target.value })}
                      className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Học phí
                  </label>
                  <input
                  name="tuition_fee"
                  value={data.tuition_fee}
                  id="tuition_fee"
                  required="required"
                  type="text"
                  onChange={(e) => setData({ ...data, tuition_fee: +e.target.value })}
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
                    value={data.training_location}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn địa điểm đào tạo</option>
                    {allLocation.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end p-4 border-t border-gray-200">
            <ButtonComponent
              type="button"
              textButton="Cập nhật"
              handleClick={handleSubmit}
            />
            <ButtonComponent
              type="button"
              textButton="Hủy"
              handleClick={handleClose}
              className="ml-2"
              style="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMajorModal;
