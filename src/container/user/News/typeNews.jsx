import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import AddTypeNewsModal from "../../modal/News/AddTypeNewsModal";
import UpdateTypeNewsModal from "../../modal/News/UpdateTypeNewsModal";
import { DeleteTypeNews, getTypeNews } from "../../../thunks/NewsThunks";

function TypeNewsManager() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { typeNews, total_page_type, current_page_type } = useSelector((state) => state.newsReducer);

  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (typeNews?.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getTypeNews({page: 1}));
    }
  }, [typeNews?.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleCreateTypeNews = () => {
    handleShowModal();
  };

  const headers = ["#", "Tên", ""];
  const columns = [
    (row, index) => index, // Display index as row number
    "name",
    (row) => (
      <div className="flex items-center space-x-2">
      <button
        className="text-yellow-500 border border-yellow-500 rounded px-2 py-1 hover:bg-yellow-100"
        onClick={() => handleEdit(row)}
      >
        Sửa
      </button>
      <button
        className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
        onClick={() => {
          if (window.confirm("Bạn có muốn xóa loại tin tức này không?")) {
            dispatch(DeleteTypeNews(row.id));
          }
        }}
      >
        Xóa
      </button>
    </div>
    
    ),
  ];
  const handlePageChange = (page) => {
    if (page < 1 || page > total_page_type) return;
    dispatch(getTypeNews({page: page}))
  };

  const handleEdit = (row) => {
    setSelectedItem(row);
    handleShowEditModal();
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateTypeNews}
          >
            Thêm loại tin tức
          </button>
        </div>
        <TableComponent
          data={typeNews}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
          current_page={current_page_type}
          total_page={total_page_type}
          handlePageChange={handlePageChange}
        />
      </div>
      <AddTypeNewsModal show={showModal} handleClose={handleCloseModal} />
      <UpdateTypeNewsModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        typeNewsId={selectedItem ? selectedItem.id : null}
      />
    </LayoutWeb>
  );
}

export default TypeNewsManager;
