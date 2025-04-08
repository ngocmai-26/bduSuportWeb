import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackThunk } from "../../../thunks/FeedBackThunk";
import moment from "moment";
import { getInfoStudent } from "../../../thunks/InfoStudentThunk";
import * as XLSX from "xlsx";

function InfoStudentManager() {
  const dispatch = useDispatch();
  const { allInfoStudent, total_page, current_page } = useSelector(
    (state) => state.infoStudentsReducer
  );
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allInfoStudent.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getInfoStudent({ page: 1 }));
    }
  }, [allInfoStudent.length, dispatch]);

  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getInfoStudent({ page: page }));
  };
  const handleCheckboxChange = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]); // Bỏ chọn tất cả
    } else {
      setSelectedRows(allInfoStudent); // Chọn tất cả (data là danh sách hàng)
    }
    setSelectAll(!selectAll);
  };

  const handleDownloadExcel = () => {
    if (!selectedRows || selectedRows?.length === 0) {
      console.error("No rows selected");
      return;
    }

    // Xử lý dữ liệu trước khi xuất
    const dataForExcel = selectedRows?.map((row) => {
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
        checked={selectedRows.includes(row)}
        onChange={() => handleCheckboxChange(row)}
      />
    ),
    (row, index) => index,
    "full_name",
    "phone_number",
    (row) => row.major?.name || "",
    "email",
    (row) => moment(row.created_at).format("HH:mm DD/MM/YYYY"), // Định dạng thời gian
    (row) => (
      <div>
        <button className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100">
          Xem
        </button>
      </div>
    ),
  ];

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end pb-2">
        <button
          onClick={handleDownloadExcel}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          disabled={selectedRows.length === 0}
        >
          Tải file Excel
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
  );
}

export default InfoStudentManager;
