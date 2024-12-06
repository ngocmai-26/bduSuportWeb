import { useLayoutEffect, useRef, useState } from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import AddLocationModal from "../../modal/Location/AddLocation";
import { DeleteLocationThunk, getLocationThunk } from "../../../thunks/LocationThunk";

function LocationsManager() {
  const [showModal, setShowModal] = useState(false);
  
  const dispatch = useDispatch();
  const { allLocation } = useSelector((state) => state.locationReducer);
  
  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (!hasFetched.current && allLocation.length <= 0) {
      hasFetched.current = true;
      dispatch(getLocationThunk());
    }
  }, [allLocation.length, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateNews = () => {
    handleShowModal();
  };

  const headers = ["#", "Địa chỉ", ""];
  const columns = [
    (row, index) => index, // Display index as row number
    "name",
    (row) => (
      <div>
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa tin tức này không?")) {
              dispatch(DeleteLocationThunk(row.id));
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
            onClick={handleCreateNews}
          >
            Tạo địa điểm
          </button>
        </div>
        <TableComponent
          data={allLocation}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
      <AddLocationModal show={showModal} handleClose={handleCloseModal} />
     
    </LayoutWeb>
  );
}

export default LocationsManager;
