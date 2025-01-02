import React, { useLayoutEffect, useRef } from "react";
import LayoutWeb from "../user/layoutWeb";
import TableComponent from "../component/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAudit } from "../../thunks/AuthThunks";
import moment from "moment";

function AuditManager() {
  const dispatch = useDispatch();
  const { audit } = useSelector((state) => state.authReducer);

  const hasFetched = useRef(false);
  useLayoutEffect(() => {
    if (audit.length <= 0 && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(getAudit());
    }
  }, [audit.length, dispatch]);

 

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
          rowsPerPage={5}
        />
      </div>
    </LayoutWeb>
  );
}

export default AuditManager;
