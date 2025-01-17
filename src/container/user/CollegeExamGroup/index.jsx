import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import AddCollegeExamGroupModal from "../../modal/CollegeExamGroup/AddCollegeExamGroupModal";
import { DeleteCollegeExamGroup, getAllCollegeExamGroup } from "../../../thunks/CollegeExamGroupThunks";

function CollegeExamGroupManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allCollegeExamGroups, total_page, current_page } = useSelector(
    (state) => state.collegeExamGroupsReducer
  );

  const hasFetched = useRef(false); 

  useLayoutEffect(() => {
    if (allCollegeExamGroups.length <= 0 && !hasFetched.current) {
      hasFetched.current = true; 
      dispatch(getAllCollegeExamGroup({page: 1}));
    }
  }, [allCollegeExamGroups.length, dispatch]);
  

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCreateCollegeExamGroup = () => {
    handleShowModal();
  };

  const headers = ["#", "Mã tổ hợp", "Tổ hợp", "Môn học", ""];
  const columns = [
    (row, index) => index,
    "code",
    "name",
    (row) => (
      <div>
        {row.subjects.map((subject) => (
          <div key={subject.id} className="mb-1">
            {subject.name}
          </div>
        ))}
      </div>
    ),
    (row) => (
      <div>
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa nhóm môn này không?")) {
              dispatch(DeleteCollegeExamGroup(row.id));
            }
          }}
        >
          Xóa
        </button>
      </div>
    ),
  ];
  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getAllCollegeExamGroup({page: page}))
  };
  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleCreateCollegeExamGroup}
          >
            Tạo nhóm môn
          </button>
        </div>
        <TableComponent
          data={allCollegeExamGroups}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          
          handlePageChange={handlePageChange}
        />
      </div>
      <AddCollegeExamGroupModal show={showModal} handleClose={handleCloseModal} />
     
    </LayoutWeb>
  );
}

export default CollegeExamGroupManager;
