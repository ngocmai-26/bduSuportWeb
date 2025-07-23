import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutWeb from "../layoutWeb";
import TableComponent from "../../component/TableComponent";
import DetailAdmissionStudent from "../../modal/AdmissionStudent/DetailAdmissionStudent";
import AdmissionFilters from "../../component/AdmissionFilters";
import { getAllAdmission, getAllAdmissionById, reviewAdmission } from "../../../thunks/AdmissionThunks";
import { getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";
import { getAllMajor } from "../../../thunks/MajorThunks";
import { getLocationThunk } from "../../../thunks/LocationThunk";
import * as XLSX from "xlsx";
import axiosInstance from "../../../axiosConfig";
import { API } from "../../../constants/api";

function AdmissionStudentManager() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    evaluation_method: "",
    major: "",
    college_exam_group: "",
    review_status: "",
    location: "",
    year: "",
  });

  const { allAdmission, total_page, current_page } = useSelector((state) => state.allAdmissionsReducer);
  const { allEvaluation } = useSelector((state) => state.evaluationReducer);
  const { allMajors } = useSelector((state) => state.majorReducer);
  const { allLocation } = useSelector((state) => state.locationReducer);
  const { allCollegeExamGroups } = useSelector((state) => state.collegeExamGroupsReducer);

  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getAllAdmission({ page: 1 })).unwrap();
        if (response?.data?.total_items) {
          setTotalItems(response.data.total_items);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchInitialData();
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getAllEvaluation({ page: 1 })),
          dispatch(getAllMajor({ page: 1 })),
          dispatch(getLocationThunk({ page: 1 })),
          dispatch(getAllCollegeExamGroup({ page: 1 }))
        ]);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

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
    setIsLoading(true);
    try {
      await dispatch(getAllAdmission({ ...filters, page: 1 }));
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > total_page) return;
    setIsLoading(true);
    try {
      await dispatch(getAllAdmission({ ...filters, page }));
    } catch (error) {
      console.error("Error changing page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPageData = async (page) => {
    try {
      const response = await axiosInstance.get(`${API.uri}/backoffice/admission-registration`, {
        params: {
          page: page,
          size: 10,
          ...filters
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.data.results;
    } catch (error) {
      console.error("Error fetching page data:", error);
      return [];
    }
  };

  const handleCheckboxChange = (row) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(row.id)) {
        newSet.delete(row.id);
        setSelectAll(false);
      } else {
        newSet.add(row.id);
        if (newSet.size === totalItems) {
          setSelectAll(true);
        }
      }
      return newSet;
    });
  };

  const handleSelectAllChange = async () => {
    setIsLoading(true);
    try {
      if (selectAll) {
        setSelectedIds(new Set());
        setSelectAll(false);
      } else {
        const currentPageIds = allAdmission.map(student => student.id);
        setSelectedIds(new Set(currentPageIds));
        
        for (let i = 1; i <= total_page; i++) {
          if (i !== current_page) {
            const pageData = await fetchPageData(i);
            if (pageData) {
              setSelectedIds(prev => {
                const newSet = new Set(prev);
                pageData.forEach(student => {
                  newSet.add(student.id);
                });
                return newSet;
              });
            }
          }
        }
        setSelectAll(true);
      }
    } catch (error) {
      console.error("Error handling select all:", error);
      setSelectAll(false);
      setSelectedIds(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (selectedIds.size === 0) {
      alert("Vui lòng chọn ít nhất một sinh viên để xuất file!");
      return;
    }

    setIsLoading(true);
    try {
      const selectedData = [];
      selectedData.push(...allAdmission.filter(row => selectedIds.has(row.id)));

      for (let i = 1; i <= total_page; i++) {
        if (i !== current_page) {
          const pageData = await fetchPageData(i);
          if (pageData) {
            const filteredData = pageData.filter(row => selectedIds.has(row.id));
            selectedData.push(...filteredData);
          }
        }
      }

      if (selectedData.length === 0) {
        alert("Không tìm thấy dữ liệu để xuất!");
        return;
      }

      const formattedData = selectedData.map(student => ({
        'Họ và tên': student.student_info.fullname,
        'Email': student.student_info.email,
        'Số điện thoại': student.student_info.phone,
        'CCCD': student.student_info.citizen_id,
        'Địa chỉ': student.student_info.address,
        'Trường THPT': student.student_info.high_school,
        'Ngành học': student.major_name,
        'Bậc học': student.academic_level_name,
        'Khối thi': student.college_exam_group_name,
        'Phương thức xét tuyển': student.evaluation_method_name,
        'Điểm tổng kết': student.final_score,
        'Trạng thái': student.is_passed ? 'Đậu' : 'Rớt'
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sinh viên");
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      XLSX.writeFile(workbook, `Danh_sach_sinh_vien_${timestamp}.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Có lỗi xảy ra khi tạo file Excel: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const headers = [
    <input
      type="checkbox"
      checked={selectAll}
      onChange={handleSelectAllChange}
      disabled={isLoading}
      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
    />,
    "#",
    "Họ và Tên",
    "Email",
    "Địa chỉ",
    "Bậc đăng kí",
    "Trạng thái",
    "Thao tác",
  ];

  const columns = [
    (row) => (
      <input
        type="checkbox"
        checked={selectedIds.has(row.id)}
        onChange={() => handleCheckboxChange(row)}
        disabled={isLoading}
        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
      />
    ),
    (row, index) => ((current_page - 1) * 10) + index + 1,
    (row) => row.student_info.fullname,
    (row) => row.student_info.email,
    (row) => row.student_info.address,
    "academic_level_name",
    (row) => (
      <span className={`px-2 py-1 rounded-full text-sm ${row.is_passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {row.is_passed ? "Đủ điểm" : "Không đủ điểm"}
      </span>
    ),
    (row) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => handleView(row.id)}
        >
          Xem
        </button>
        {row.review_status === "pending" && (
          <>
            {row.is_passed ? (
              <button
                className="text-green-600 hover:text-green-800 font-medium"
                onClick={() => dispatch(reviewAdmission(row.id, { is_approve: true }))}
              >
                Gửi thông báo
              </button>
            ) : (
              <button
                className="text-red-600 hover:text-red-800 font-medium"
                onClick={() => dispatch(reviewAdmission(row.id, { is_approve: false }))}
              >
                Gửi thông báo
              </button>
            )}
          </>
        )}
        {row.review_status === "rejected" && (
          <span className="text-red-600">Không trúng tuyển</span>
        )}
        {row.review_status === "approved" && (
          <span className="text-green-600">Trúng tuyển</span>
        )}
      </div>
    ),
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <LayoutWeb>
      <div className="px-6 mx-auto">

        <AdmissionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          evaluationMethods={allEvaluation}
          majors={allMajors}
          examGroups={allCollegeExamGroups}
          years={years}
        />

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {isLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-blue-600 rounded-full"></div>
                  Đang xử lý...
                </span>
              ) : (
                `Đã chọn: ${selectedIds.size}/${totalItems} sinh viên`
              )}
            </div>
            <button
              onClick={handleDownloadExcel}
              disabled={selectedIds.size === 0 || isLoading}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${selectedIds.size === 0 || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isLoading ? 'Đang xử lý...' : 'Tải file Excel'}
            </button>
          </div>
        </div>

        <TableComponent
          data={allAdmission}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>

      <DetailAdmissionStudent
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
      />
    </LayoutWeb>
  );
}

export default AdmissionStudentManager;
