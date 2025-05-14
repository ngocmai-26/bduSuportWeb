import { useLayoutEffect, useRef, useState } from "react";
import LayoutWeb from "../layoutWeb";
import TableComponent from "../../component/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import DetailMajorModal from "../../modal/Major/DetailMajorModal";
import AddFunctionModal from "../../modal/FunctionModal/AddFunctionModal";
import { deleteFunction, getAllFunction } from "../../../thunks/FunctionThunks";
import UpdateFunctionModal from "../../modal/FunctionModal/UpdateFunctionModal";
import DetailFunctionModal from "../../modal/FunctionModal/detailFunctionModal";

function FunctionManager() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const { allFunctions, total_page, current_page } = useSelector((state) => state.functionReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allFunctions.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getAllFunction({page: 1}));
    }
  }, [allFunctions.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleCreateMajor = () => {
    handleShowModal();
  };

  const headers = [
    "#",
    "Mã ngành",
    "Link đến",
    "",
  ];
  const columns = [
    (row, index) => index,
    "name",
    "direct_to",
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
            if (window.confirm("Bạn có muốn xóa chức năng này không?")) {
              dispatch(deleteFunction(row.id));
            }
          }}
        >
          Xóa
        </button>
      </div>
    ),
  ];
  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getAllFunction({page: page}))
  };
  const handleView = (row, action) => {
    console.log("row", row)
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
            Tạo chức năng
          </button>
        </div>
        <TableComponent
          data={allFunctions}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
        />
      </div>
      <AddFunctionModal show={showModal} handleClose={handleCloseModal} />
      <DetailFunctionModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        initialData={selectedItem}
      />
      <UpdateFunctionModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        initialData={selectedItem}
      />
    </LayoutWeb>
  );
}

export default FunctionManager;
