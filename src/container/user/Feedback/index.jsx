import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackThunk } from "../../../thunks/FeedBackThunk";

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
    "created_at",
    (row) => (
      <div>
        <button
          className="text-blue-500 hover:underline mr-2"
        >
          Xem chi tiết
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
