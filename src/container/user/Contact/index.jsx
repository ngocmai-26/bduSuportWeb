import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContactThunk } from "../../../thunks/ContactThunks";
import AddContactModal from "../../modal/Contact/addContactModal";
import UpdateContactModal from "../../modal/Contact/updateContactModal";

function ContactManager() {
  const [showModal, setShowModal] = useState(false);
  
  const dispatch = useDispatch();
  const { allContacts, total_page, current_page } = useSelector((state) => state.contactReducer);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  
  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (!hasFetched.current && allContacts?.length <= 0) {
      hasFetched.current = true;
      dispatch(getContactThunk({page: 1}));
    }
  }, [allContacts?.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateNews = () => {
    handleShowModal();
  };

  
  const handleEdit = (row) => {
    setSelectedItem(row);
    handleShowUpdateModal();
  };

  const headers = ["#", "Tên", "Số điện thoại", "Địa chỉ", ""];
  const columns = [
    (row, index) => index, 
    "name",
    "phone",
    "location_name",
    (row) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa liên hệ này không?")) {
              dispatch(deleteContact(row.id));
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
    dispatch(getContactThunk({page: page}))
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateNews}
          >
            Tạo liên hệ
          </button>
        </div>
        <TableComponent
          data={allContacts}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
        />
      </div>
      <AddContactModal show={showModal} handleClose={handleCloseModal} />
        <UpdateContactModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default ContactManager;
