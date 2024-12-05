import {  useLayoutEffect, useRef} from "react";
import TableComponent from "../../component/TableComponent";
import LayoutWeb from "../layoutWeb";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvaluation } from "../../../thunks/EvaluationThunks";

function EvaluationManager() {
  const dispatch = useDispatch();
  const { allEvaluation } = useSelector((state) => state.evaluationReducer);

  const hasFetched = useRef(false); 
  useLayoutEffect(() => {
    if (allEvaluation.length <= 0 && !hasFetched.current) {
      hasFetched.current = true; 
      dispatch(getAllEvaluation());
    }
  }, [allEvaluation.length, dispatch]);

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

  

  return (
    <LayoutWeb>
      <div className="px-10">
        <TableComponent
          data={allEvaluation}
          headers={headers}
          columns={columns}
          rowsPerPage={5}
        />
      </div>
   
    </LayoutWeb>
  );
}

export default EvaluationManager;
