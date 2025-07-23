import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFacilityThunk,
  getFacilitiesThunk,
} from "../../../thunks/FacilityThunks";
import AddFacilityModal from "../../modal/Facility/AddFacilityModal";
import UpdateFacilityModal from "../../modal/Facility/UpdateFacilityModal";
import DetailFacilityModal from "../../modal/Facility/DetailFacilityModal";
import AddFacilityImageModal from "../../modal/Facility/AddFacilityImageModal";
import {
  addFacilityImageThunk,
  deleteFacilityImageThunk,
} from "../../../thunks/FacilityImageThunks";

function FacilityManager() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { allFacilities, total_page, current_page } = useSelector(
    (state) => state.facilityReducer
  );
  const { images: facilityImages } = useSelector((state) => state.facilityImageReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (allFacilities?.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getFacilitiesThunk({ page: 1 }));
    }
  }, [allFacilities?.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleCreateFacility = () => {
    handleShowModal();
  };

  const handleEdit = (row) => {
    setSelectedItem(row);
    handleShowUpdateModal();
  };

  const handleShowDetail = (row) => {
    setSelectedItem(row);
    setShowDetailModal(true);
  };
  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  const handleShowAddImage = () => {
    console.log("aa")
    setShowAddImageModal(true);
  }
  const handleCloseAddImage = () => setShowAddImageModal(false);

  const handleAddImage = (image, cb) => {
    if (selectedItem) {
      dispatch(addFacilityImageThunk(selectedItem.id, image)).then(() => {
        dispatch(getFacilitiesThunk({ page: current_page }));
        if (cb) cb();
        setShowAddImageModal(false);
      });
    }
  };
  const handleDeleteImage = (imageId) => {
    if (selectedItem) {
      dispatch(deleteFacilityImageThunk(selectedItem.id, imageId)).then(() => {
        dispatch(getFacilitiesThunk({ page: current_page }));
      });
    }
  };

  const headers = ["#", "Tên", "Mô tả",  ""];
  const columns = [
    (row, index) => (current_page - 1) * 10 + index + 1,
    "name",
    "description",
   
    (row) => (
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-500 border border-blue-500 rounded px-2 py-1 hover:bg-blue-100"
          onClick={() => handleShowDetail(row)}
        >
          Xem chi tiết
        </button>
        <button
          className="text-yellow-500 border border-yellow-500 rounded px-2 py-1 hover:bg-yellow-100"
          onClick={() => handleEdit(row)}
        >
          Sửa
        </button>
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa cơ sở vật chất này không?")) {
              dispatch(deleteFacilityThunk(row.id));
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
    dispatch(getFacilitiesThunk({ page: page }));
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleCreateFacility}
          >
            Tạo cơ sở vật chất
          </button>
        </div>
        <TableComponent
          data={allFacilities}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
        />
      </div>
      <AddFacilityModal show={showModal} handleClose={handleCloseModal} />
      <UpdateFacilityModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        facility={selectedItem}
      />
      <DetailFacilityModal
        show={showDetailModal}
        handleClose={handleCloseDetail}
        facility={selectedItem}
        images={selectedItem?.images || []}
        onAddImage={handleShowAddImage}
        onDeleteImage={handleDeleteImage}
      />
      <AddFacilityImageModal
        show={showAddImageModal}
        handleClose={handleCloseAddImage}
        onSubmit={handleAddImage}
      />
    </LayoutWeb>
  );
}

export default FacilityManager; 