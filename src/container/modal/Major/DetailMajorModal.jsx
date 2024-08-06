import React from 'react';

const DetailMajorModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  const {
    name,
    expected_target,
    college_exam_groups,
    description,
    year,
    benchmark_30,
    benchmark_competency_assessment_exam,
    tuition_fee,
    training_location,
    academic_level,
    evaluation_methods,
  } = item;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 relative overflow-hidden">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Chi Tiết Ngành Học</h2>
        <div className="space-y-2">
          <p><strong className="text-gray-600">Tên Ngành:</strong> {name}</p>
          <p><strong className="text-gray-600">Chỉ Tiêu:</strong> {expected_target}</p>
          <p><strong className="text-gray-600">Tổ Hợp:</strong></p>
          <ul className="list-disc pl-5">
            {college_exam_groups.map((group, index) => (
              <li key={index}>
                <strong>{group.name}</strong> ({group.code}): {group.subjects.map(subject => subject.name).join(", ")}
              </li>
            ))}
          </ul>
          <p><strong className="text-gray-600">Mô Tả:</strong> {description}</p>
          <p><strong className="text-gray-600">Năm:</strong> {year}</p>
          <p><strong className="text-gray-600">Điểm Chuẩn:</strong> {benchmark_30}</p>
          <p><strong className="text-gray-600">Điểm Đánh Giá Năng Lực:</strong> {benchmark_competency_assessment_exam}</p>
          <p><strong className="text-gray-600">Học Phí:</strong> {tuition_fee}</p>
          <p><strong className="text-gray-600">Địa Điểm Đào Tạo:</strong> {training_location}</p>
          <p><strong className="text-gray-600">Trình Độ Học Vấn:</strong> {academic_level}</p>
          <p><strong className="text-gray-600">Phương Pháp Đánh Giá:</strong></p>
          <ul className="list-disc pl-5">
            {evaluation_methods.map((method, index) => (
              <li key={index}>
                <strong>{method.name}</strong> ({method.code})
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailMajorModal;
