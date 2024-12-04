import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { deleteAcademic, getAllAcademic } from "../../../thunks/AcademicThunks";
import AddAcademicModal from "../../modal/Academic/AddAcademicModel";
import UpdateAcademicModal from "../../modal/Academic/UpdateAcademicModel";

function AcademicManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allAcademic } = useSelector((state) => state.academicsReducer);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

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
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleDeleteAcademic(row.id)}
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
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

  const handleEdit = (row) => {
    setSelectedItem(row);
    handleShowUpdateModal();
  };

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
      <UpdateAcademicModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        item={selectedItem}
      />
    </LayoutWeb>
  );
}

export default AcademicManager;
