import { useLayoutEffect, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import AddNewsModal from "../../modal/News/AddNewsModal";
import UpdateNewsModal from "../../modal/News/UpdateNewsModal";
import { DeleteNewsThunk, getNewsThunk } from "../../../thunks/NewsThunks";
import { useDispatch, useSelector } from "react-redux";

function NewsManager() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.newsReducer);

  useLayoutEffect(() => {
    dispatch(getNewsThunk());
  }, [dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleCreateNews = () => {
    handleShowModal();
  };

  const headers = ["#", "title", "link", "image", "Action"];
  const columns = [
    (row, index) => index, // Display index as row number
    "title",
    (row) => (
      <a
        href={row.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {row.link}
      </a>
    ),
    (row) => (
      <img src={row.image} alt={row.title} className="h-16 w-16 object-cover" />
    ),
    (row) => (
      <div>
       
        <button
          className="text-blue-500 hover:underline mr-2"
          onClick={() => handleEdit(row)}
        >
          Sửa
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa tin tức này không?")) {
              dispatch(DeleteNewsThunk(row.id));
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
    handleShowUpdateModal();
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateNews}
          >
            Tạo tin tức
          </button>
        </div>
        <TableComponent
          data={allNews}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      <AddNewsModal show={showModal} handleClose={handleCloseModal} />
      <UpdateNewsModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        newsId={selectedItem?.id}
      />
     
    </LayoutWeb>
  );
}

export default NewsManager;
