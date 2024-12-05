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
    number_of_credits,
    benchmark_school_record
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
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Chi Tiết Ngành Học</h2>
        <div className="space-y-6 text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong className="font-medium">Tên Ngành:</strong> {name}
            </p>
            <p>
              <strong className="font-medium">Chỉ Tiêu:</strong> {expected_target}
            </p>
            <p>
              <strong className="font-medium">Năm:</strong> {year}
            </p>
            <p>
              <strong className="font-medium">Điểm Chuẩn:</strong> {benchmark_30}
            </p>
            <p>
              <strong className="font-medium">Điểm ĐG Năng Lực:</strong> {benchmark_competency_assessment_exam}
            </p>
            <p>
              <strong className="font-medium">Điểm Chuẩn Học bạ:</strong> {benchmark_school_record}
            </p>
            <p>
              <strong className="font-medium">Tín chỉ:</strong> {number_of_credits}
            </p>
            <p>
              <strong className="font-medium">Học Phí:</strong> {tuition_fee}
            </p>
            <p>
              <strong className="font-medium">Địa Điểm Đào Tạo:</strong> {training_location}
            </p>
            <p>
              <strong className="font-medium">Trình Độ Học Vấn:</strong> {academic_level}
            </p>
          </div>

          <div className="space-y-2">
            <strong className="font-medium block">Tổ Hợp:</strong>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              {college_exam_groups.map((group, index) => (
                <li key={index}>
                  <strong>{group.name}</strong> ({group.code}): {group.subjects.map(subject => subject.name).join(", ")}
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
