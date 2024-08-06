import { useLayoutEffect, useState } from "react";
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
  const { typeNews } = useSelector((state) => state.newsReducer);

  useLayoutEffect(() => {
    if (typeNews.length <= 0) {
      dispatch(getTypeNews());
    }
  }, [dispatch, typeNews.length]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleCreateTypeNews = () => {
    handleShowModal();
  };

  const headers = ["#", "name", "Action"];
  const columns = [
    (row, index) => index, // Display index as row number
    "name",
    (row) => (
      <div>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(row)}
        >
          Sửa
        </button>
        <button
          className="text-red-500 hover:underline"
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
