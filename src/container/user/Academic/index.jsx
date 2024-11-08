import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { deleteAcademic, getAllAcademic } from "../../../thunks/AcademicThunks";
import AddAcademicModal from "../../modal/Academic/AddAcademicModel";

function AcademicManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allAcademic } = useSelector((state) => state.academicsReducer);

  const hasFetched = useRef(false);

  useLayoutEffect(() => {
    if (allAcademic.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getAllAcademic());
    }
  }, [allAcademic.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateAcademic = () => {
    handleShowModal();
  };
  const handleDeleteAcademic = (id) => {
    dispatch(deleteAcademic(id));
  };

  const headers = ["#", "Tên cấp bậc", ""];
  const columns = [
    (row, index) => index,
    "name",
    (row) => (
      <div>
        <button
          onClick={() => handleDeleteAcademic(row.id)}
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
            onClick={handleCreateAcademic}
          >
            Tạo cấp bậc
          </button>
        </div>
        <TableComponent
          data={allAcademic}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      <AddAcademicModal show={showModal} handleClose={handleCloseModal} />
    </LayoutWeb>
  );
}

export default AcademicManager;
