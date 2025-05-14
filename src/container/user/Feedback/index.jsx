import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackThunk } from "../../../thunks/FeedBackThunk";
import moment from "moment";
import DetailFeedbackModal from "../../modal/feedback/detailFeedback";

function FeedBackManager() {
  const dispatch = useDispatch();
  const { allFeedBack, total_page, current_page } = useSelector((state) => state.feedbacksReducer);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allFeedBack.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getFeedbackThunk({page: 1}));
    }
  }, [allFeedBack.length, dispatch]);

  
  const handleShowDetailModal = () => setShowDetailModal(true);
  const handleCloseDetailModal = () => setShowDetailModal(false);


  const headers = ["#", "Tựa đề", "Người gửi","Số điện thoại", "Ngày gửi", ""];
  const columns = [
    (row, index) => index,
    "title",
    "feedbacker_role",
    "phone_number",
    (row) => moment(row.created_at).format("HH:mm DD/MM/YYYY"), // Định dạng thời gian
    (row) => (
      <div>
        <button
          className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
          onClick={() => handleView(row)}
        >
          Xem
        </button>
       
      </div>
    ),
  ];
  
  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getFeedbackThunk({page: page}))
  };

  const handleView = (row) => {
    setSelectedItem(row);
    handleShowDetailModal();
  };



  return (
   <>
    <LayoutWeb>
      <div className="px-10">
        
        <TableComponent
          data={allFeedBack}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
        />
      </div>
    </LayoutWeb>
    <DetailFeedbackModal
    isOpen={showDetailModal}
    onClose={handleCloseDetailModal}
    item={selectedItem}
  /></>
  );
}

export default FeedBackManager;
