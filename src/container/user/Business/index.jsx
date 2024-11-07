import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessesThunk } from "../../../thunks/BusinessThunk";
import AddBusinessModal from "../../modal/Business/AddBusinessModal";

function BusinessesManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allBusiness } = useSelector((state) => state.businessesReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allBusiness.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getBusinessesThunk());
    }
  }, [allBusiness.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateNews = () => {
    handleShowModal();
  };

  const headers = ["#", "Tựa đề", "Đường dẫn","Tên doanh nghiệp", "Hình ảnh", ""];
  const columns = [
    (row, index) => index,
    "job_title",
    (row) => (
      <a
        href={row.post_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {row.post_url}
      </a>
    ),
    "business_name",
    (row) => (
      <img src={row.banner} alt={row.business_name} className="h-16 w-16 object-cover" />
    ),
    (row) => (
      <div>
        <button
          className="text-blue-500 hover:underline mr-2"
        >
          Sửa
        </button>
        <button
          className="text-red-500 hover:underline"
         
        >
          Xóa
        </button>
      </div>
    ),
  ];

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateNews}
          >
            Tạo tin tuyển dụng

          </button>
        </div>
        <TableComponent
          data={allBusiness}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      <AddBusinessModal show={showModal} handleClose={handleCloseModal} />
    </LayoutWeb>
  );
}

export default BusinessesManager;
