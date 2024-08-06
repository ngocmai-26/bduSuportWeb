import { useLayoutEffect, useState } from "react";
import LayoutWeb from "../layoutWeb";
import TableComponent from "../../component/TableComponent";
import DetailAccountModal from "../../modal/Account/detailAccountModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteMajor, getAllMajor } from "../../../thunks/MajorThunks";
import AddMajorModal from "../../modal/Major/AddMajorModal";
import UpdateMajorModal from "../../modal/Major/UpdateMajorModal";
import DetailMajorModal from "../../modal/Major/DetailMajorModal";

function MajorManager() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); 
  const dispatch = useDispatch();
  const { allMajors } = useSelector(
    (state) => state.majorReducer
  );

  useLayoutEffect(() => {
    if (allMajors.length <= 0) {
      dispatch(getAllMajor());
    }
  }, [dispatch, allMajors.length]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleCreateMajor = () => {
    handleShowModal();
  };

  const headers = ["#", "Mã ngành", "Tên ngành", "Tổ hợp", "Chỉ tiêu", "Điểm chuẩn", "Năm", "Action"];
  const columns = [
    (row, index) => index, 
    "code",
    "name",
    (row) => row.college_exam_groups.map((group) => (
      <div key={group.id}>
        {group.code}: {group.subjects.map((subject) => subject.name).join(", ")}
      </div>
    )),
    "expected_target",
    "benchmark_30",
    "year",
    (row) => (
      <div>
        <button
          className="text-blue-500 hover:underline mr-2"
          onClick={() => handleView(row, "view")}
        >
          Xem
        </button>
        <button
          className="text-yellow-500 hover:underline mr-2"
          onClick={() => handleView(row, "edit")}
        >
          Chỉnh sửa
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => {
            if (
              window.confirm("Bạn có muốn xóa ngành học này không?")
            ) {
              dispatch(deleteMajor(row.code));
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

  return ( 
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateMajor}
          >
            Tạo ngành học
          </button>
        </div>
        <TableComponent
          data={allMajors}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
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
