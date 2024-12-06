import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";  
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import AddSubjectModal from "../../modal/Subject/addSubjectModal";
import { DeleteSubjectThunk, getAllSubject } from "../../../thunks/SubjectThunks";

function SubjectManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allSubject } = useSelector(
    (state) => state.subjectsReducer
  );
  
  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (allSubject.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getAllSubject());
    }
  }, [allSubject.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateSubject = () => {
    handleShowModal();
  };

  const headers = ["#", "Tên môn xét tuyển", ""];
  const columns = [
    (row, index) => index,
    "name",
    (row) => (
      <div>
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (
              window.confirm("Bạn có muốn xóa môn học này không?")
            ) {
              dispatch(DeleteSubjectThunk(row.id));
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
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={handleCreateSubject}
        >
          Tạo môn xét tuyển
        </button>
        </div>
        <TableComponent
          data={allSubject}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      <AddSubjectModal show={showModal} handleClose={handleCloseModal} />
     
    </LayoutWeb>
  );
}

export default SubjectManager;
