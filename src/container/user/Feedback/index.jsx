import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackThunk } from "../../../thunks/FeedBackThunk";
import moment from "moment";

function FeedBackManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allFeedBack } = useSelector((state) => state.feedbacksReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allFeedBack.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getFeedbackThunk());
    }
  }, [allFeedBack.length, dispatch]);

  const handleShowModal = () => setShowModal(true);

  const handleCreateNews = () => {
    handleShowModal();
  };

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
        >
          Xem
        </button>
       
      </div>
    ),
  ];

  return (
    <LayoutWeb>
      <div className="px-10">
        
        <TableComponent
          data={allFeedBack}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
    </LayoutWeb>
  );
}

export default FeedBackManager;
