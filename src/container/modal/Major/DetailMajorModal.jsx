import React from "react";

const DetailMajorModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  console.log("item", item);
  const {
    name,
    expected_target,
    college_exam_groups,
    description,
    year,
    benchmark_30,
    benchmark_competency_assessment_exam,
    tuition_fee,
    academic_level_name,
    training_location_name,
    academic_level,
    evaluation_methods,
    number_of_credits,
    benchmark_school_record,
  } = item;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/4 p-8 relative max-h-screen overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-300"
          onClick={onClose}
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Chi Tiết Ngành Học
        </h2>
        <div className="space-y-6 text-gray-700">
          <div className="grid gap-4">
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Tên Ngành:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"name"}
                  value={name}
                  id={"name"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Chỉ Tiêu:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"expected_target"}
                  value={expected_target || "Chưa công bố"}
                  id={"expected_target"}
                  required={"required"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Năm học:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"year"}
                  value={year}
                  id={"year"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Điểm chuẩn:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"benchmark_30"}
                  value={benchmark_30 || "Chưa công bố"}
                  id={"benchmark_30"}
                  required={"required"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Điểm đánh giá năng lực:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"benchmark_competency_assessment_exam"}
                  value={benchmark_competency_assessment_exam || "Chưa công bố"}
                  id={"benchmark_competency_assessment_exam"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Điểm chuẩn học bạ:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"benchmark_school_record"}
                  value={benchmark_school_record}
                  id={"benchmark_school_record"}
                  required={"required"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Tín chỉ:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"number_of_credits"}
                  value={number_of_credits || "Chưa công bố"}
                  id={"number_of_credits"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Học phí:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"tuition_fee"}
                  value={tuition_fee}
                  id={"tuition_fee"}
                  required={"required"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mb-4 w-[50%] ">
                <label className="block text-sm font-medium text-gray-700">
                  Địa điểm đào tạo:
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"training_location_name"}
                  value={training_location_name || "Chưa công bố"}
                  id={"training_location_name"}
                  required={"required"}
                />
              </div>
              <div className="mb-4 w-[50%]">
                <label className="block text-sm font-medium text-gray-700">
                  Trình độ học vấn
                </label>
                <input
                  className="border w-full p-1.5 rounded-md"
                  disabled
                  name={"academic_level_name"}
                  value={academic_level_name}
                  id={"academic_level"}
                  required={"required"}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <strong className="font-medium block">Tổ Hợp:</strong>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              {college_exam_groups.map((group, index) => (
                <li key={index}>
                  <strong>{group.name}</strong> ({group.code}):{" "}
                  {group.subjects.map((subject) => subject.name).join(", ")}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <strong className="font-medium block">Phương Pháp Đánh Giá:</strong>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              {evaluation_methods.map((method, index) => (
                <li key={index}>
                  <strong>{method.name}</strong> ({method.code})
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p>
              <strong className="font-medium">Mô Tả:</strong> {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMajorModal;
