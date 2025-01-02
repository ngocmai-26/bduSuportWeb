import { useDispatch } from "react-redux";
import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { createNotification } from "../../../thunks/NotificationThunk";

function CreateNotificationModel({ show, handleClose }) {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({ content: "" });
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let formErrors = {};
    if (!notification.content)
      formErrors.content = "Địa điểm không được bỏ trống";
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("notification", notification);
        dispatch(createNotification(notification)).then(() => {
          handleClose();
          setNotification({ content: "" });
        });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setNotification({});
    setErrors({});
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm nội dung thông báo</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <textarea
                className="p-2 rounded-md w-full border border-slate-200 outline-slate-200 text-sm text-slate-500 pr-10"
                name="content"
                id="content"
                errors={errors}
                require={"require"}
                onChange={(e) => setNotification({content: e.target.value})}
                rows={5}
              />
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton={
                  "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
                handleClick={handleSubmit}
                type={"button"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotificationModel;
