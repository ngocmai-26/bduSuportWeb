import React, { useState } from "react";
import { useSelector } from "react-redux";

const DetailAdmissionStudent = ({ isOpen, onClose }) => {
  const { singleAdmission } = useSelector(
    (state) => state.allAdmissionsReducer
  );
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
            <td className="py-2 px-4 border-b text-center">
              {subject.subject_name}
            </td>
            <td className="py-2 px-4 border-b text-center">
              {subject.scores.find((score) => score.grade === 12)?.score ||
                "N/A"}{" "}
              (
              {subject.scores.find((score) => score.grade === 12)
                ?.semester_name || "N/A"}
              )
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
            <td className="py-2 px-4 border-b text-center">
              {subject.subject_name}
            </td>
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
            <td className="py-2 px-4 border-b text-center">
              {subject.subject_name}
            </td>
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
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Điểm Môn Học</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {header.map((col, index) => (
                <th key={index} className="py-2 px-4 border-b text-center">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
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

  const renderFiles = () => {
    if (!singleAdmission?.files || singleAdmission.files.length === 0)
      return null;

    return (
      <>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Hình Ảnh Đính Kèm
          </h3>
          <div className="flex space-x-4 overflow-x-auto">
            {singleAdmission.files.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={file}
                  alt={`File ${index + 1}`}
                  className="h-32 w-auto object-cover rounded-md shadow-md cursor-pointer mb-2"
                  onClick={() => openImageModal(index)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => openImageModal(0)} // Bắt đầu hiển thị từ hình đầu tiên
            className="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
          >
            Xem Chi Tiết
          </button>
        </div>
      </>
    );
  };

  return (

     //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    //   <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 relative max-h-screen overflow-y-auto transform transition-all duration-300">
    //     <button
    //       className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
    //       onClick={onClose}
    //     >
    //       <span className="text-2xl leading-none">&times;</span>
    //     </button>
    //     <h2 className="text-2xl font-semibold mb-4 text-center border-b pb-2">
    //       Chi Tiết Thông Tin Sinh Viên
    //     </h2>
    //     {singleAdmission ? (
    //       <div className="space-y-6">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           <div>
    //             <h3 className="text-lg font-semibold text-gray-700 mb-2">Thông tin cá nhân</h3>
    //             <p><strong className="text-gray-600">ID:</strong> {singleAdmission?.student_info?.id}</p>
    //             <p><strong className="text-gray-600">Họ Tên:</strong> {singleAdmission?.student_info?.fullname}</p>
    //             <p><strong className="text-gray-600">Giới Tính:</strong> {singleAdmission?.student_info?.gender ? "Nam" : "Nữ"}</p>
    //             <p><strong className="text-gray-600">Ngày Sinh:</strong> {singleAdmission?.student_info?.date_of_birth}</p>
    //             <p><strong className="text-gray-600">CMND/CCCD:</strong> {singleAdmission?.student_info?.citizen_id}</p>
    //             <p><strong className="text-gray-600">Email:</strong> {singleAdmission?.student_info?.email}</p>
    //             <p><strong className="text-gray-600">Số Điện Thoại:</strong> {singleAdmission?.student_info?.phone}</p>
    //             <p><strong className="text-gray-600">Địa Chỉ:</strong> {singleAdmission?.student_info?.address}</p>
    //             <p><strong className="text-gray-600">Thành Phố:</strong> {singleAdmission?.student_info?.city}</p>
    //             <p><strong className="text-gray-600">Trường THPT:</strong> {singleAdmission?.student_info?.high_school}</p>
    //           </div>
    //           <div>
    //             <h3 className="text-lg font-semibold text-gray-700 mb-2">Thông tin học tập</h3>
    //             <p><strong className="text-gray-600">Ngành Học:</strong> {singleAdmission?.major_name}</p>
    //             <p><strong className="text-gray-600">Trình Độ Học Vấn:</strong> {singleAdmission?.academic_level_name}</p>
    //             <p><strong className="text-gray-600">Khối Thi:</strong> {singleAdmission?.college_exam_group_name} {singleAdmission?.college_exam_group_code}</p>
    //             <p><strong className="text-gray-600">Phương Thức Xét Tuyển:</strong> {singleAdmission?.evaluation_method_name || "Không có"}</p>
    //             <p><strong className="text-gray-600">Điểm Tổng Kết:</strong> {singleAdmission?.final_score === -1 ? "Không có" : singleAdmission?.final_score}</p>
    //             <p><strong className="text-gray-600">Kết Quả:</strong> {singleAdmission?.is_passed ? "Đậu" : "Rớt"}</p>
    //           </div>
    //         </div>
    //         {renderSubjectScores()}
    //         {renderFiles()}
    //       </div>
    //     ) : (
    //       <p className="text-center text-gray-500">Không có thông tin sinh viên.</p>
    //     )}
    //   </div>

      // {isImageOpen && (
      //   <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-60">
      //     <button
      //       className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition"
      //       onClick={closeImageModal}
      //     >
      //       &times;
      //     </button>
      //     <button
      //       className="absolute left-4 text-white text-3xl hover:text-gray-300 transition"
      //       onClick={showPreviousImage}
      //     >
      //       &#8592;
      //     </button>
      //     <img
      //       src={singleAdmission.files[currentImageIndex]}
      //       alt={`hình ảnh ${currentImageIndex + 1}`}
      //       className="max-w-full max-h-full object-contain rounded-lg shadow-md"
      //     />
      //     <button
      //       className="absolute right-4 text-white text-3xl hover:text-gray-300 transition"
      //       onClick={showNextImage}
      //     >
      //       &#8594;
      //     </button>
      //   </div>
      // )}
    // </div>
    <div className="">
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center `}>
        <div className="bg-white rounded-lg shadow-2xl w-9/12 md:w-2/4 lg:w-2/4 p-6 relative max-h-[80%] overflow-y-auto transform transition-all duration-300">

            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Chi Tiết Thông Tin Sinh Viên
            </h2>
            <button
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
              onClick={onClose}
            >
              X
            </button>
            <form>
              <div className="flex gap-2">
                <div className="mb-4 w-[50%] ">
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"fullname"}
                    value={singleAdmission?.student_info?.fullname}
                    id={"fullname"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Giới tính
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"gender"}
                    value={singleAdmission?.student_info?.gender ? "Nam" : "Nữ"}
                    id={"gender"}
                    required={"required"}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-4  w-[50%] ">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày sinh
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"date_of_birth"}
                    value={singleAdmission?.student_info?.date_of_birth}
                    id={"date_of_birth"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4 w-[50%] ">
                  <label className="block text-sm font-medium text-gray-700">
                    CCCD
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"citizen_id_card"}
                    value={singleAdmission?.student_info?.citizen_id}
                    id={"citizen_id_card"}
                    required={"required"}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-4  w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"email"}
                    value={singleAdmission?.student_info?.email}
                    id={"email"}
                    required={"required"}
                  />
                </div>

                <div className="mb-4  w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    SDT
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"phone"}
                    value={singleAdmission?.student_info?.phone}
                    id={"phone"}
                    required={"required"}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-4 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"address"}
                    value={singleAdmission?.student_info?.address}
                    id={"address"}
                    required={"required"}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Trường THPT
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"high_school"}
                    value={singleAdmission?.student_info?.high_school}
                    id={"high_school"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Thành phố
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"city"}
                    value={singleAdmission?.student_info?.city}
                    id={"city"}
                    required={"required"}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngành học
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"major_name"}
                    value={singleAdmission?.major_name}
                    id={"major_name"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Trình độ đăng ký
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"academic_level_name"}
                    value={singleAdmission?.academic_level_name}
                    id={"academic_level_name"}
                    required={"required"}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Khối thi
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"college_exam_group_name"}
                    value={singleAdmission?.college_exam_group_name}
                    id={"college_exam_group_name"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Phương thức xét tuyển
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"evaluation_method_name"}
                    value={
                      singleAdmission?.evaluation_method_name || "Không có"
                    }
                    id={"evaluation_method_name"}
                    required={"required"}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Điểm tổng kết
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"final_score"}
                    value={
                      singleAdmission?.final_score === -1
                        ? "Không có"
                        : singleAdmission?.final_score
                    }
                    id={"final_score"}
                    required={"required"}
                  />
                </div>
                <div className="mb-4 w-[50%]">
                  <label className="block text-sm font-medium text-gray-700">
                    Kết quả
                  </label>
                  <input
                    className="border w-full p-1.5 rounded-md"
                    disabled
                    name={"is_passed"}
                    value={singleAdmission?.is_passed ? "Đậu" : "Rớt"}
                    id={"is_passed"}
                    required={"required"}
                  />
                </div>
              </div>
            </form>
            {renderSubjectScores()}
            {renderFiles()}
        </div>
      </div>
      {isImageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition"
            onClick={closeImageModal}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white text-3xl hover:text-gray-300 transition"
            onClick={showPreviousImage}
          >
            &#8592;
          </button>
          <img
            src={singleAdmission.files[currentImageIndex]}
            alt={`hình ảnh ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-md"
          />
          <button
            className="absolute right-4 text-white text-3xl hover:text-gray-300 transition"
            onClick={showNextImage}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailAdmissionStudent;
