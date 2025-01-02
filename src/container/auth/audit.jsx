import React, { useLayoutEffect, useRef } from "react";
import LayoutWeb from "../user/layoutWeb";
import TableComponent from "../component/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAudit } from "../../thunks/AuthThunks";
import moment from "moment";

function AuditManager() {
  const dispatch = useDispatch();
  const { audit, total_page, current_page } = useSelector((state) => state.authReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (audit.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getAudit({page: 1}));
    }
  }, [audit.length, dispatch]);

 const handlePageChange = (page) => {
     if (page < 1 || page > total_page) return;
     dispatch(getAudit({page: page}))
   };

  const headers = ["#", "Email", "Hành động", "Chi tiết", "Thời gian"];
  const columns = [
    (row, index) => index + 1, // Display index as row number
    "email",
    "action",
    "detail",
    (row) => (
        <div>
          {moment(row.created_at).format("HH:mm DD/MM/YYYY")}
        </div>
      ),
    
  ];

  return (
    <LayoutWeb>
      <div className="px-10">
        {/* Dropdown bộ lọc */}
        
        {/* Bảng hiển thị tin tức */}
        <TableComponent
          data={audit}
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

export default AuditManager;
