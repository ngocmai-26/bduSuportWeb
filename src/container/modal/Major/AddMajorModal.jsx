import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { createMajor } from "../../../thunks/MajorThunks";
import { getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";
import { getAllAcademic } from "../../../thunks/AcademicThunks";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";
import { getLocationThunk } from "../../../thunks/LocationThunk";

function AddMajorModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [selectedAcademic, setSelectedAcademic] = useState(null);
  const [data, setData] = useState({
    code: "",
    name: "",
    expected_target: 0,
    college_exam_groups: [],
    description: "",
    year: 0,
    benchmark_30: 0,
    benchmark_competency_assessment_exam: 0,
    tuition_fee: 0,
    training_location: 0,
    academic_level: 0,
    benchmark_school_record: 0,
    evaluation_methods: [],
    number_of_credits: 0,
  });

  const { allCollegeExamGroups } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );

  const { allAcademic } = useSelector((state) => state.academicsReducer);

  const { allEvaluation } = useSelector((state) => state.evaluationReducer);
  const { allLocation } = useSelector((state) => state.locationReducer);
  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allCollegeExamGroups.length <= 0 && !hasFetched.current) {
      dispatch(getAllCollegeExamGroup());
    }
  }, [allCollegeExamGroups.length, hasFetched, dispatch]);

  useLayoutEffect(() => {
    if (allAcademic.length <= 0&& !hasFetched.current) {
      dispatch(getAllAcademic());
    }
  }, [allAcademic.length, hasFetched, dispatch]);
  useLayoutEffect(() => {
    if (allEvaluation.length <= 0&& !hasFetched.current) {
      dispatch(getAllEvaluation());
    }
  }, [allEvaluation.length, hasFetched, dispatch]);
  useLayoutEffect(() => {
    if (allLocation.length <= 0 && !hasFetched.current) {
      dispatch(getLocationThunk());
    }
  }, [allLocation.length, hasFetched, dispatch]);

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
    }
  }, [selectedAcademic]);

  const handleSubmit = () => {
    dispatch(createMajor(data)).then((res) => {

      handleClose();
      setData({
        code: "",
        name: "",
        expected_target: 0,
        college_exam_groups: [],
        description: "",
        year: 0,
        benchmark_30: 0,
        benchmark_competency_assessment_exam: 0,
        tuition_fee: 0,
        training_location: 0,
        academic_level: 0,
        benchmark_school_record: 0,
        evaluation_methods: [],
        number_of_credits: 0,
      })
    });
  };

  const handleCloseModal = () => {
    handleClose();
    setData({
      code: "",
      name: "",
      expected_target: 0,
      college_exam_groups: [],
      description: "",
      year: 0,
      benchmark_30: 0,
      benchmark_competency_assessment_exam: 0,
      tuition_fee: 0,
      training_location: 0,
      academic_level: 0,
      benchmark_school_record: 0,
      evaluation_methods: [],
      number_of_credits: 0,
    })
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
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Thêm ngành học
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form className="space-y-4 max-h-[650px] overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mã ngành
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Tên ngành
                </label>
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
                values={data}
                id="description"
                setValue={setData}
                required="required"
                onChange={handleChange}
                className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
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
                value={data.academic_level}
                onChange={(e) =>
                  setData({ ...data, academic_level: +e.target.value })
                }
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

            {data.academic_level && selectedAcademic ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tổ hợp
                    </label>
                    <div className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm h-40 overflow-y-auto">
                      {allCollegeExamGroups.map((group) => (
                        <div key={group.id}>
                          <label>
                            <input
                              type="checkbox"
                              className="mx-3"
                              value={group.id}
                              checked={data.college_exam_groups.includes(
                                group.id
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
                      {allEvaluation?.map((method) => (
                        <div key={method.code}>
                          <label>
                            <input
                              type="checkbox"
                              className="mx-3"
                              value={method.code}
                              checked={data.evaluation_methods.includes(
                                method.code
                              )}
                              onChange={() =>
                                handleEvaluationMethodsChange(method.code)
                              }
                            />
                            {method.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                      Điểm đánh giá năng lực
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
              </div>
            ) : (
              <></>
            )}
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
                  onChange={(e) => setData({ ...data, training_location: +e.target.value })}
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

            <ButtonComponent
              textButton="Tạo mới"
              styleButton="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              handleClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMajorModal;
