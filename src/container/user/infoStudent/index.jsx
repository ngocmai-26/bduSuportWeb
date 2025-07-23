import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackThunk } from "../../../thunks/FeedBackThunk";
import moment from "moment";
import { getInfoStudent } from "../../../thunks/InfoStudentThunk";
import * as XLSX from "xlsx";
import DetailInfoStudentModal from "../../modal/InformationStudent/detailInfoStudent";
import axiosInstance from "../../../axiosConfig";
import { API } from "../../../constants/api";

function InfoStudentManager() {
  const dispatch = useDispatch();
  const { allInfoStudent, total_page, current_page } = useSelector(
    (state) => state.infoStudentsReducer
  );
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);

  const hasFetched = useRef(false);

  // Fetch initial data and total count
  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await dispatch(getInfoStudent({ page: 1 })).unwrap();
        if (response?.data?.total_items) {
          setTotalItems(response.data.total_items);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchInitialData();
    }
  }, [dispatch]);

  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getInfoStudent({ page: page }));
  };

  const handleCheckboxChange = (row) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(row.id)) {
        newSet.delete(row.id);
        setSelectAll(false);
      } else {
        newSet.add(row.id);
        // Check if all items are selected
        if (newSet.size === totalItems) {
          setSelectAll(true);
        }
      }
      return newSet;
    });
  };

  // Hàm để fetch dữ liệu mà không thay đổi state của Redux
  const fetchPageData = async (page) => {
    try {
      const response = await axiosInstance.get(`${API.uri}/backoffice/reservations`, {
        params: {
          page: page,
          size: 10,
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

  const handleSelectAllChange = async () => {
    setIsLoading(true);
    try {
      if (selectAll) {
        // Unselect all
        setSelectedIds(new Set());
        setSelectAll(false);
      } else {
        // Select all by fetching current page first
        const currentPageIds = allInfoStudent.map(student => student.id);
        setSelectedIds(new Set(currentPageIds));
        
        // Then fetch other pages in background without affecting current page
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
      console.error("No rows selected");
      return;
    }

    setIsLoading(true);
    try {
      const selectedData = [];
      // First add current page data
      selectedData.push(...allInfoStudent.filter(row => selectedIds.has(row.id)));

      // Then fetch other pages if needed
      for (let i = 1; i <= total_page; i++) {
        if (i !== current_page) {
          const pageData = await fetchPageData(i);
          if (pageData) {
            const filteredData = pageData.filter(row => selectedIds.has(row.id));
            selectedData.push(...filteredData);
          }
        }
      }

      const dataForExcel = selectedData.map((row) => {
        return {
          ...row,
          files:
            row.files && row.files.length > 0
              ? row.files.join(", ")
              : "No Files",
          subject_scores:
            row.subject_scores && row.subject_scores.length > 0
              ? row.subject_scores
                  .map((score) => `${score.subject}: ${score.score}`)
                  .join(", ")
              : "No Scores",
          recalled_at: row.recalled_at || "N/A",
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Students");
      XLSX.writeFile(workbook, "Selected_Admissions.xlsx");
    } catch (error) {
      console.error("Error preparing Excel data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (row) => {
    setSelectedItem(row);
    handleShowDetailModal();
  };

  const headers = [
    <input
      type="checkbox"
      checked={selectAll}
      onChange={handleSelectAllChange}
      disabled={isLoading}
    />,
    "#",
    "Họ và Tên",
    "SDT",
    "Ngành đăng kí",
    "Email",
    "Ngày đăng kí",
    "",
  ];
  
  const columns = [
    (row) => (
      <input
        type="checkbox"
        checked={selectedIds.has(row.id)}
        onChange={() => handleCheckboxChange(row)}
        disabled={isLoading}
      />
    ),
    (row, index) => ((current_page - 1) * 5) + index + 1,
    "full_name",
    "phone_number",
    (row) => row.major?.name || "",
    "email",
    (row) => moment(row.created_at).format("HH:mm DD/MM/YYYY"),
    (row) => (
      <div>
        <button
          className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
          onClick={() => handleView(row)}
        >
          Xem
        </button>
      </div>
    ),
  ];

  return (
    <>
      <LayoutWeb>
        <div className="px-10">
          <div className="flex justify-between pb-2">
            <div className="text-gray-600">
              {isLoading ? (
                "Đang xử lý..."
              ) : (
                `Đã chọn: ${selectedIds.size}/${totalItems} sinh viên`
              )}
            </div>
            <button
              onClick={handleDownloadExcel}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              disabled={selectedIds.size === 0 || isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Tải file Excel"}
            </button>
          </div>
          <TableComponent
            data={allInfoStudent}
            headers={headers}
            columns={columns}
            rowsPerPage={5}
            current_page={current_page}
            total_page={total_page}
            handlePageChange={handlePageChange}
          />
        </div>
      </LayoutWeb>
      <DetailInfoStudentModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </>
  );
}

export default InfoStudentManager;
