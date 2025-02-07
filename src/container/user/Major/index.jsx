import { useLayoutEffect, useRef, useState } from "react";
import LayoutWeb from "../layoutWeb";
import TableComponent from "../../component/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteMajor, getAllMajor } from "../../../thunks/MajorThunks";
import AddMajorModal from "../../modal/Major/AddMajorModal";
import UpdateMajorModal from "../../modal/Major/UpdateMajorModal";
import DetailMajorModal from "../../modal/Major/DetailMajorModal";
import * as XLSX from "xlsx";

function MajorManager() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const { allMajors, total_pageMajor, current_page } = useSelector(
    (state) => state.majorReducer
  );

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allMajors.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getAllMajor({ page: 1 }));
    }
  }, [allMajors.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleCreateMajor = () => {
    handleShowModal();
  };

  const handleCheckboxChange = (row) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(row)
        ? prevSelected.filter((item) => item !== row)
        : [...prevSelected, row]
    );
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Majors");
    XLSX.writeFile(workbook, "Selected_Majors.xlsx");
  };

  const headers = [
    "",
    "#",
    "Mã ngành",
    "Tên ngành",
    "Tổ hợp",
    "Chỉ tiêu",
    "Điểm chuẩn",
    "Năm",
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
    "code",
    "name",
    (row) =>
      row.college_exam_groups?.map((group) => (
        <div key={group.id}>
          {group.code}:{" "}
          {group.subjects?.map((subject) => subject.name).join(", ")}
        </div>
      )),
    "expected_target",
    "benchmark_30",
    "year",
    (row) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
          onClick={() => handleView(row, "view")}
        >
          Xem
        </button>
        <button
          className="text-yellow-500 border border-yellow-500 rounded px-2 py-1 hover:bg-yellow-100"
          onClick={() => handleView(row, "edit")}
        >
          sửa
        </button>
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa ngành học này không?")) {
              dispatch(deleteMajor(row.id));
            }
          }}
        >
          Xóa
        </button>
      </div>
    ),
  ];

  const handleView = (row, action) => {
    setSelectedItem(row);
    if (action === "view") {
      handleShowDetailModal();
    } else if (action === "edit") {
      handleShowUpdateModal();
    }
  };
  const handlePageChange = (page) => {
    if (page < 1 || page > total_pageMajor) return;
    dispatch(getAllMajor({ page: page }));
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end items-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleCreateMajor}
          >
            Tạo ngành học
          </button>
          {/* <button
            className="bg-green-500  hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={handleDownloadExcel}
            disabled={selectedRows.length === 0}
          >
            Tải file Excel
          </button> */}
        </div>
        <TableComponent
          data={allMajors}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_pageMajor}
          handlePageChange={handlePageChange}
        />
      </div>
      <AddMajorModal show={showModal} handleClose={handleCloseModal} />
      <DetailMajorModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
      <UpdateMajorModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        initialData={selectedItem}
      />
    </LayoutWeb>
  );
}

export default MajorManager;
