import React, { useState } from "react";
import { useSelector } from "react-redux";

const DetailAdmissionStudent = ({ isOpen, onClose }) => {
  const { singleAdmission } = useSelector((state) => state.allAdmissionsReducer);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setIsImageOpen(true);
  };

  const closeImageModal = () => {
    setIsImageOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === singleAdmission.files.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? singleAdmission.files.length - 1 : prevIndex - 1
    );
  };

  const renderSubjectScores = () => {
    if (!singleAdmission?.subject_scores) return null;

    let header = [];
    let rows = [];

    switch (singleAdmission.evaluation_method) {
      case "grades_10_11_12":
        header = ["Môn", "Lớp 10", "Lớp 11", "Lớp 12"];
        rows = singleAdmission.subject_scores.map((subject) => (
          <tr key={subject.subject_id}>
            <td className="py-2 px-4 border-b">{subject.subject_name}</td>
            {subject.scores.map((score, index) => (
              <td key={index} className="py-2 px-4 border-b text-center">
                {score.score} ({score.semester_name})
              </td>
            ))}
          </tr>
        ));
        break;

      case "grade_12":
        header = ["Môn", "Lớp 12"];
        rows = singleAdmission.subject_scores.map((subject) => (
          <tr key={subject.subject_id}>
            <td className="py-2 px-4 border-b">{subject.subject_name}</td>
            <td className="py-2 px-4 border-b text-center">
              {subject.scores.find((score) => score.grade === 12)?.score || "N/A"}{" "}
              ({subject.scores.find((score) => score.grade === 12)?.semester_name || "N/A"})
            </td>
          </tr>
        ));
        break;

      case "competency_assessment_exam":
        header = ["Điểm Đánh Giá Năng Lực"];
        rows = (
          <tr>
            <td className="py-2 px-4 border-b text-center">
              {singleAdmission.final_score || "N/A"}
            </td>
          </tr>
        );
        break;

      case "5_semesters_of_high_school":
        header = [
          "Môn",
          "Kỳ 1 Lớp 10",
          "Kỳ 2 Lớp 10",
          "Kỳ 1 Lớp 11",
          "Kỳ 2 Lớp 11",
          "Kỳ 1 Lớp 12",
        ];
        rows = singleAdmission.subject_scores.map((subject) => (
          <tr key={subject.subject_id}>
            <td className="py-2 px-4 border-b">{subject.subject_name}</td>
            {subject.scores.map((score, index) => (
              <td key={index} className="py-2 px-4 border-b text-center">
                {score.score} ({score.semester_name})
              </td>
            ))}
          </tr>
        ));
        break;

      case "high_school_graduation_exam":
        header = ["Môn", "Điểm Tốt Nghiệp"];
        rows = singleAdmission.subject_scores.map((subject) => (
          <tr key={subject.subject_id}>
            <td className="py-2 px-4 border-b">{subject.subject_name}</td>
            {subject.scores.map((score, index) => (
              <td key={index} className="py-2 px-4 border-b text-center">
                {score.score}
              </td>
            ))}
          </tr>
        ));
        break;

      default:
        return null;
    }

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Điểm Môn Học</h3>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {header.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderFiles = () => {
    if (!singleAdmission?.files || singleAdmission.files.length === 0) return null;

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Hình Ảnh Đính Kèm</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {singleAdmission.files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file}
                alt={`File ${index + 1}`}
                className="h-32 w-full object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-200 transform group-hover:scale-105"
                onClick={() => openImageModal(index)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderField = (label, value) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        className="border w-full p-2 rounded-md bg-gray-50 text-gray-700"
        disabled
        value={value || ""}
      />
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Chi Tiết Thông Tin Sinh Viên
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-4">Thông tin cá nhân</h4>
                      {renderField("Họ và tên", singleAdmission?.student_info?.fullname)}
                      {renderField("Giới tính", singleAdmission?.student_info?.gender ? "Nam" : "Nữ")}
                      {renderField("Ngày sinh", singleAdmission?.student_info?.date_of_birth)}
                      {renderField("CCCD", singleAdmission?.student_info?.citizen_id)}
                      {renderField("Email", singleAdmission?.student_info?.email)}
                      {renderField("Số điện thoại", singleAdmission?.student_info?.phone)}
                      {renderField("Địa chỉ", singleAdmission?.student_info?.address)}
                      {renderField("Thành phố", singleAdmission?.student_info?.city)}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-4">Thông tin học tập</h4>
                      {renderField("Trường THPT", singleAdmission?.student_info?.high_school)}
                      {renderField("Ngành học", singleAdmission?.major_name)}
                      {renderField("Bậc học", singleAdmission?.academic_level_name)}
                      {renderField("Khối thi", singleAdmission?.college_exam_group_name)}
                      {renderField("Phương thức xét tuyển", singleAdmission?.evaluation_method_name)}
                      {renderField("Điểm tổng kết", singleAdmission?.final_score === -1 ? "Không có" : singleAdmission?.final_score)}
                      {renderField("Kết quả", singleAdmission?.is_passed ? "Đậu" : "Rớt")}
                    </div>
                  </div>

                  {renderSubjectScores()}
                  {renderFiles()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isImageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[60]">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={showPreviousImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={singleAdmission.files[currentImageIndex]}
            alt={`Hình ảnh ${currentImageIndex + 1}`}
            className="max-w-[90%] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />

          <button
            onClick={showNextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            Hình {currentImageIndex + 1} / {singleAdmission.files.length}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailAdmissionStudent;
