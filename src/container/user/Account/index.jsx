import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../component/TableComponent";
import DetailAccountModal from "../../modal/Account/detailAccountModal";
import LayoutWeb from "../layoutWeb";
import ModalAddAccount from "../../modal/Account/AddAcountModal";
import { getAllAccount, unlockAccount, lockAccount } from "../../../thunks/AccountThunks";
import ResetPwModal from "../../modal/Account/resetPwModal";

function AccountManager() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResetPwModal, setShowResetPwModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userID, setUserID] = useState(null);
  const dispatch = useDispatch();
  const { allAccount, total_page, current_page } = useSelector((state) => state.accountsReducer);

  const hasFetched = useRef(false); 

  useLayoutEffect(() => {
    if (allAccount.length <= 0 && !hasFetched.current) {
      hasFetched.current = true; 
      dispatch(getAllAccount({page: 1}));
    }
  }, [allAccount.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowResetPwModal = () => setShowResetPwModal(true);
  const handleCloseResetPwModal = () => setShowResetPwModal(false);

  const handleCreateAccount = () => {
    handleShowModal();
  };

  const handleResetPwModal = (row) => {
    handleShowResetPwModal();
    setUserID(row.id)
  };

  const handleView = (row) => {
    setSelectedItem(row);
    handleShowDetailModal();
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getAllAccount({page: page}))
  };

  const handleToggleStatus = (row) => {
    if (row?.status === "blocked") {
      dispatch(unlockAccount(row.id));
    } else {
      dispatch(lockAccount(row.id));
    }
  };


  const renderStatus = (status) => {
    return status === "UNVERIFIED" ? "Chưa xác thực" : "Đã xác thực";
  };
  const headers = ["#", "Email", "Số điện thoại", "Chức vụ", "Trạng thái", ""];
  const columns = [
    (row, index) => index + 1,
    "email",
    "phone",
    "role",
    (row) => renderStatus(row?.status),
    (row) => (
      <div className="flex items-center space-x-2">
      <button
        className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
        onClick={() => handleView(row)}
      >
        Xem
      </button>
      <button
        className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
        onClick={() => handleResetPwModal(row)}
      >
        Đổi mật khẩu
      </button>
      <button
        className={`${
          row?.status === "blocked"
            ? "text-green-500 border border-green-500 hover:bg-green-100"
            : "text-red-500 border border-red-500 hover:bg-red-100"
        } rounded px-2 py-1`}
        onClick={() => handleToggleStatus(row)}
      >
        {row?.status === "blocked" ? "Mở khóa" : "Khóa"}
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
          rowsPerPage={10}
          handlePageChange={handlePageChange}
          current_page={current_page}
          total_page={total_page}
        />
      </div>
      <ModalAddAccount show={showModal} handleClose={handleCloseModal} />
      <ResetPwModal show={showResetPwModal} handleClose={handleCloseResetPwModal} userID={userID} />
      <DetailAccountModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default AccountManager;
