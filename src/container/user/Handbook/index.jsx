import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { deleteHandbook, getHandbookThunk } from "../../../thunks/HandbookThunk";
import AddHandbookModal from "../../modal/Handbook/addHandbookModal";
import UpdateHandbookModal from "../../modal/Handbook/updateHandbookModal";

function HandbookManager() {
  const [showModal, setShowModal] = useState(false);
  
  const dispatch = useDispatch();
  const { allHandbooks, total_page, current_page } = useSelector((state) => state.handbookReducer);

  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  
  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (!hasFetched.current && allHandbooks?.length <= 0) {
      hasFetched.current = true;
      dispatch(getHandbookThunk({page: 1}));
    }
  }, [allHandbooks?.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateNews = () => {
    handleShowModal();
  };

  const handleEdit = (row) => {
    setSelectedItem(row);
    handleShowUpdateModal();
  };

  const headers = ["#", "Tên", "Link", ""];
  const columns = [
    (row, index) => index, // Display index as row number
    "name",
    "link",
    (row) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa handbook này không?")) {
              dispatch(deleteHandbook(row.id));
            }
          }}
        >
          Xóa
        </button>
        <button
          className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
          onClick={() => handleEdit(row)}
        >
          Sửa
        </button>
      </div>
    ),
  ];

  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getHandbookThunk({page: page}))
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateNews}
          >
            Tạo Handbook
          </button>
        </div>
        <TableComponent
          data={allHandbooks}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
        />
      </div>
      <AddHandbookModal show={showModal} handleClose={handleCloseModal} />
      <UpdateHandbookModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default HandbookManager;
