import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LayoutWeb from "../layoutWeb";
import TableComponent from "../../component/TableComponent";
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
import * as XLSX from "xlsx";
import Select, { components } from "react-select";
import { getLocationThunk } from "../../../thunks/LocationThunk";

function AdmissionStudentManager() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    evaluation_method: "",
    major: "",
    college_exam_group: "",
    review_status: "",
    location: ""
  });

  const { allAdmission, total_page, current_page } = useSelector(
    (state) => state.allAdmissionsReducer
  );
  // const { allCollegeExamGroups } = useSelector(
  //   (state) => state.collegeExamGroupsReducer
  // );
  const { allEvaluation } = useSelector((state) => state.evaluationReducer);
  const { allMajors, total_pageMajor } = useSelector(
    (state) => state.majorReducer
  );
  const { allLocation} = useSelector((state) => state.locationReducer);

  const dispatch = useDispatch();

  const [isInitialFetch, setIsInitialFetch] = useState(true);

  useLayoutEffect(() => {
    if (isInitialFetch && allAdmission?.length === 0) {
      dispatch(getAllAdmission({ page: 1 }));
      setIsInitialFetch(false);
    }
  }, [isInitialFetch, allAdmission?.length, dispatch]);

  // useEffect(() => {
  //   if (allCollegeExamGroups?.length <= 0) {
  //     dispatch(getAllCollegeExamGroup({ page: 1 }));
  //   }
  // }, [allCollegeExamGroups?.length, dispatch]);
  useEffect(() => {
    if (allEvaluation?.length <= 0) {
      dispatch(getAllEvaluation({ page: 1 }));
    }
  }, [allEvaluation?.length, dispatch]);
  useEffect(() => {
    if (allLocation?.length <= 0) {
      dispatch(getLocationThunk({ page: 1 }));
    }
  }, [allLocation?.length, dispatch]);

  useEffect(() => {
    if (allMajors?.length <= 0) {
      dispatch(getAllMajor({ page: 1 }));
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

  const handleSearch = async () => {
    const res = await dispatch(getAllAdmission(filters));
    if (res?.payload?.length === 0) {
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getAllAdmission({ page: page }));
  };

  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row)
        ? prev.filter((r) => r !== row)
        : [...prev, row]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]); // Bỏ chọn tất cả
    } else {
      setSelectedRows(allAdmission); // Chọn tất cả (data là danh sách hàng)
    }
    setSelectAll(!selectAll);
  };

  const handleDownloadExcel = () => {
    if (!selectedRows || selectedRows.length === 0) {
      console.error("No rows selected");
      return;
    }

    // Xử lý dữ liệu trước khi xuất
    const dataForExcel = selectedRows.map((row) => {
      return {
        ...row, // Lấy tất cả các trường từ đối tượng gốc
        files:
          row.files && row.files.length > 0
            ? row.files.join(", ") // Nối các phần tử trong mảng bằng dấu phẩy
            : "No Files", // Trường hợp mảng rỗng
        subject_scores:
          row.subject_scores && row.subject_scores.length > 0
            ? row.subject_scores
                .map((score) => `${score.subject}: ${score.score}`)
                .join(", ")
            : "No Scores",
        recalled_at: row.recalled_at || "N/A", // Thay thế giá trị null bằng "N/A"
      };
    });

    // Chuyển đổi dữ liệu JSON sang Excel
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Students");

    // Xuất file Excel
    XLSX.writeFile(workbook, "Selected_Admissions.xlsx");
  };

  const headers = [
    <input
    type="checkbox"
    checked={selectAll}
    onChange={handleSelectAllChange}
  />,
    "#",
    "Họ và Tên",
    "Email",
    "Địa chỉ",
    "Bậc đăng kí",
    "Trạng thái",
    "",
  ];
  const columns = [
    (row) => (
      <input
        type="checkbox"
        checked={selectedRows.includes(row)}
        onChange={() => handleCheckboxChange(row)}
      />
    ),
    (row, index) => index + 1,
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
                className="text-green-500 border-green-500  border rounded px-2 py-1 hover:bg-green-100"
                onClick={() =>
                  dispatch(reviewAdmission(row.id, { is_approve: true }))
                }
              >
                Gửi thông báo
              </button>
            ) : (
              <button
                className="bg-red-500 text-white border border-red-500 rounded px-2 py-1"
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

  

  const [majorsList, setMajorsList] = useState([]); // Local state for accumulated subjects
  useEffect(() => {
    if (allMajors.length > 0) {
      setMajorsList((prevSubjects) => [...prevSubjects, ...allMajors]);
    }
  }, [allMajors]);

  // const options = majorsList?.map((major) => ({
  //   value: major.id,
  //   label: major.name,
  // }));
  // const isWaiting = useRef(false); // Use ref to manage waiting state
  // const [pageMajor, setPageMajor] = useState(1); // Current page
  // const [loading, setLoading] = useState(false); // Loading state
  // const handleScroll = (e) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.target;
  //   if (
  //     scrollHeight - scrollTop > clientHeight - 10 &&
  //     scrollHeight - scrollTop <= clientHeight + 10 &&
  //     !loading &&
  //     pageMajor <= total_pageMajor &&
  //     !isWaiting.current
  //   ) {
  //     setLoading(true);
  //     isWaiting.current = true;

  //     dispatch(getAllMajor({ page: pageMajor + 1 })).then((e) => {
  //       setLoading(false);
  //       isWaiting.current = false;
  //       setPageMajor((prevPage) => prevPage + 1);
  //     });
  //   }
  // };

  // const CustomMenuList = (props) => {
  //   const menuRef = useRef(null);

  //   useEffect(() => {
  //     const menu = menuRef.current;
  //     if (menu) {
  //       const onScroll = (e) => handleScroll(e);
  //       menu.addEventListener("scroll", onScroll);

  //       return () => {
  //         menu.removeEventListener("scroll", onScroll);
  //       };
  //     }
  //   }, []);

  //   return (
  //     <components.MenuList {...props} innerRef={menuRef}>
  //       {props.children}
  //     </components.MenuList>
  //   );
  // };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <select
              name="evaluation_method"
              value={filters?.evaluation_method}
              onChange={handleFilterChange}
              className="border rounded-md p-2 max-w-64"
            >
              <option value="">Chọn phương pháp đánh giá</option>
              {allEvaluation?.map((method) => (
                <option key={method.code} value={method.code}>
                  {method.name}
                </option>
              ))}
            </select>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="border rounded-md p-2 w-[170px]"
            >
              <option value="">Chọn vị trí</option>
              {allLocation?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>

            {/* <Select
              options={options}
              onChange={(selectedOption) =>
                setFilters((prev) => ({ ...prev, major: selectedOption.value }))
              }
              menuPlacement="auto"
              menuShouldBlockScroll={true}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "200px", // 🔥 Cố định width
                }),
                menu: (provided) => ({
                  ...provided,
                  width: "200px", // 🔥 Đảm bảo menu dropdown cũng có width cố định
                }),
              }}
              components={{ MenuList: CustomMenuList }} // Dùng Custom MenuList
            /> */}
            {/* <select
              name="college_exam_group"
              value={filters.college_exam_group}
              onChange={handleFilterChange}
              className="border rounded-md p-2"
            >
              <option value="">Chọn nhóm thi đại học</option>
              {allCollegeExamGroups?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select> */}
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
          <button
            onClick={handleDownloadExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            disabled={selectedRows.length === 0}
          >
            Tải file Excel
          </button>
        </div>
        <TableComponent
          data={allAdmission}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
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
