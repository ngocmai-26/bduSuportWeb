import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../component/TableComponent";
import DetailAccountModal from "../../modal/Account/detailAccountModal";
import LayoutWeb from "../layoutWeb";
import ModalAddAccount from "../../modal/Account/AddAcountModal";
import { getAllAccount, unlockAccount, lockAccount } from "../../../thunks/AccountThunks";

function AccountManager() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { allAccount } = useSelector((state) => state.accountsReducer);

  useLayoutEffect(() => {
    if (allAccount.length <= 0) {
      dispatch(getAllAccount());
    }
  }, [allAccount.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);

  const handleCreateAccount = () => {
    handleShowModal();
  };

  const handleView = (row) => {
    setSelectedItem(row);
    handleShowDetailModal();
  };

  const handleToggleStatus = (row) => {
    if (row.status === "blocked") {
      dispatch(unlockAccount(row.id));
    } else {
      dispatch(lockAccount(row.id));
    }
  };
  const renderStatus = (status) => {
    return status === "UNVERIFIED" ? "Chưa xác thực" : "Đã xác thực";
  };
  const headers = ["#", "Email", "Số điện thoại", "Chức vụ", "Trạng thái", "Hành động"];
  const columns = [
    (row, index) => index + 1,
    "email",
    "phone",
    "role",
    (row) => renderStatus(row.status),
    (row) => (
      <div>
        <button
          className="text-blue-500 hover:underline mr-2"
          onClick={() => handleView(row)}
        >
          Xem
        </button>
       
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleToggleStatus(row)}
        >
          {row.status === "blocked" ? "Mở khóa" : "Khóa"}
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
            onClick={handleCreateAccount}
          >
            Tạo tài khoản
          </button>
        </div>

        <TableComponent
          data={allAccount}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      <ModalAddAccount show={showModal} handleClose={handleCloseModal} />
      <DetailAccountModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default AccountManager;
