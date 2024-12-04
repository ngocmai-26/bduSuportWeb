import { useLayoutEffect, useRef, useState } from "react";
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
  const [selectedType, setSelectedType] = useState(""); // Trạng thái cho bộ lọc loại tin tức
  const dispatch = useDispatch();
  const { allNews, typeNews } = useSelector((state) => state.newsReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allNews.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getNewsThunk());
    }
  }, [allNews.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleCreateNews = () => {
    handleShowModal();
  };

  const handleEdit = (row) => {
    setSelectedItem(row);
    handleShowUpdateModal();
  };

  // Lọc allNews theo selectedType
  const filteredNews = selectedType
    ? allNews.filter((item) => item.type === +selectedType)
    : allNews;

  const headers = ["#", "Tựa đề", "Đường dẫn", "Hình ảnh", ""];
  const columns = [
    (row, index) => index + 1, // Display index as row number
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

  return (
    <LayoutWeb>
      <div className="px-10">
        {/* Dropdown bộ lọc */}
        <div className="flex justify-between mb-4">
          <div>
            <select
              className="border rounded-md p-2"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Tất cả loại tin tức</option>
              {typeNews.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleCreateNews}
          >
            Tạo tin tức
          </button>
        </div>
        {/* Bảng hiển thị tin tức */}
        <TableComponent
          data={filteredNews}
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
