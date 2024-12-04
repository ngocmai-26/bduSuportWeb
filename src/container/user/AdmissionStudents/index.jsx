import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LayoutWeb from "../layoutWeb";
import TableComponent from "../../component/TableComponent";
import DetailAccountModal from "../../modal/Account/detailAccountModal";
import {
  getAllAdmission,
  getAllAdmissionById,
  reviewAdmission,
} from "../../../thunks/AdmissionThunks";
import { getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";
import { getAllMajor } from "../../../thunks/MajorThunks";
import { useDispatch, useSelector } from "react-redux";
import DetailAdmissionStudent from "../../modal/AdmissionStudent/DetailAdmissionStudent";

function AdmissionStudentManager() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    evaluation_method: "",
    major: "",
    college_exam_group: "",
    review_status: "",
  });
  const { allAdmission } = useSelector((state) => state.allAdmissionsReducer);
  const { allCollegeExamGroups } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );
  const { allEvaluation } = useSelector((state) => state.evaluationReducer);
  const { allMajors } = useSelector((state) => state.majorReducer);
  const dispatch = useDispatch();

  const hasFetched = useRef(false);

  useLayoutEffect(() => {
    if (allCollegeExamGroups?.length <= 0) {
      hasFetched.current = true;
      dispatch(getAllCollegeExamGroup());
    }
  }, [allCollegeExamGroups?.length, dispatch]);
  useLayoutEffect(() => {
    if (allEvaluation?.length <= 0 ) {
      hasFetched.current = true;
      dispatch(getAllEvaluation());
    }
  }, [allEvaluation?.length, dispatch]);
  useLayoutEffect(() => {
    if (allAdmission?.length <= 0) {
      hasFetched.current = true;
      dispatch(getAllAdmission());
    }
  }, [allAdmission, dispatch]);
  useLayoutEffect(() => {
    if (allMajors?.length <= 0 ) {
      hasFetched.current = true;
      dispatch(getAllMajor());
    }
  }, [allMajors?.length, dispatch]);

  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);

  const handleView = (id) => {
    dispatch(getAllAdmissionById(id));
    handleShowDetailModal();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    dispatch(getAllAdmission(filters));
  };


  const headers = [
    "#",
    "Họ và Tên",
    "Email",
    "Địa chỉ",
    "Bậc đăng kí",
    "Trạng thái",
    "",
  ];
  const columns = [
    (row, index) => index,
    (row) => row.student_info.fullname,
    (row) => row.student_info.email,
    (row) => row.student_info.address,
    "academic_level_name",
    (row) => (
      <span className={row.is_passed ? "text-green-500" : "text-red-500"}>
        {row.is_passed ? "Đủ điểm" : "Không đủ điểm"}
      </span>
    ),
    (row) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-500 border border-blue-500 rounded px-2 py-1 bg-transparent hover:bg-blue-100"
          onClick={() => handleView(row.id)}
        >
          Xem
        </button>
        {row.review_status === "pending" ? (
          <>
            {row.is_passed ? (
              <button
                className="text-green-500 border-green-500  border rounded px-2 py-1 hover:bg-green-100 " 
                
                onClick={() =>
                  dispatch(reviewAdmission(row.id, { is_approve: true }))
                }
              >
                Gửi thông báo
              </button>
            ) : (
              <button
                className="bg-red-500 text-white  border border-red-500 rounded px-2 py-1"
                onClick={() =>
                  dispatch(reviewAdmission(row.id, { is_approve: false }))
                }
              >
                Gửi thông báo
              </button>
            )}
          </>
        ) : row.review_status === "rejected" ? (
          <p className="text-red-500">Không trúng tuyển</p>
        ) : row.review_status === "approved" ? (
          <p className="text-green-500">Trúng tuyển</p>
        ) : (
          <></>
        )}
      </div>
    ),
  ];

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex space-x-4  mb-4">
          <select
            name="evaluation_method"
            value={filters?.evaluation_method}
            onChange={handleFilterChange}
            className="border rounded-md p-2 max-w-64"
          >
            <option value="">Chọn phương pháp đánh giá</option>
            {allEvaluation.map((method) => (
              <option key={method.code} value={method.code}>
                {method.name}
              </option>
            ))}
          </select>
          <select
            name="major"
            value={filters.major}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">Chọn chuyên ngành</option>
            {allMajors.map((major) => (
              <option key={major.id} value={major.id}>
                {major.name}
              </option>
            ))}
          </select>
          <select
            name="college_exam_group"
            value={filters.college_exam_group}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">Chọn nhóm thi đại học</option>
            {allCollegeExamGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <select
            name="review_status"
            value={filters.review_status}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">Chọn trạng thái</option>
            <option value="pending">Đang chờ</option>
            <option value="rejected">Từ chối</option>
            <option value="approved">Chấp nhận</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Tìm kiếm
          </button>
        </div>
        <TableComponent
          data={allAdmission}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
          currentPage={currentPage}
        />
      </div>
      <DetailAdmissionStudent
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default AdmissionStudentManager;
