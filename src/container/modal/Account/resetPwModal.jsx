import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { resetPassword } from "../../../thunks/AuthThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import icons

function ResetPwModal({ show, handleClose, userID }) {
  const dispatch = useDispatch(); 
  const [new_password, setNewPw] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để hiển thị mật khẩu

  const handleSubmit = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!regex.test(new_password.new_password)) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
    } else {
      setError("");
      dispatch(resetPassword({ id: userID, data: new_password })).then(() => {
        handleClose();
        setNewPw({ new_password: "" });
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleClose}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thay đổi mật khẩu</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <div className="relative">
                <FormField
                  name={"new_password"}
                  values={new_password}
                  id={"new_password"}
                  setValue={setNewPw}
                  type={showPassword ? "text" : "password"} // Chuyển đổi hiển thị mật khẩu
                  required={"required"}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye} // Hiển thị biểu tượng phù hợp
                    className="text-gray-500"
                  />
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Thay đổi"
                style="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                handleClick={handleSubmit}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPwModal;
