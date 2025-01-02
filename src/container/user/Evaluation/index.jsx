import {  useLayoutEffect, useRef} from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";

function EvaluationManager() {
  const dispatch = useDispatch();
  const { allEvaluation, total_page, current_page } = useSelector((state) => state.evaluationReducer);

  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (allEvaluation?.length <= 0 && !hasFetched.current) {
      hasFetched.current = true; 
      dispatch(getAllEvaluation({page: 1}));
    }
  }, [allEvaluation?.length, dispatch]);

  const headers = ["#", "Mã code", "Tên", ""];
  const columns = [
    (row, index) => index, // Display index as row number
    "code",
    "name",
    (row) => (
      <div>
      
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-100"
          // onClick={() => handleDelete(row.id)}
        >
          Xóa
        </button>
      </div>
    ),
  ];

  const handlePageChange = (page) => {
    if (page < 1 || page > total_page) return;
    dispatch(getAllEvaluation({page: page}))
  };

  return (
    <LayoutWeb>
      <div className="px-10">
        <TableComponent
          data={allEvaluation}
          headers={headers}
          columns={columns}
          rowsPerPage={10}
          current_page={current_page}
          total_page={total_page}
          handlePageChange={handlePageChange}
        />
      </div>
   
    </LayoutWeb>
  );
}

export default EvaluationManager;
