import { useLayoutEffect, useState, useRef } from "react";
import { AddNewsThunk, getTypeNews } from "../../../thunks/NewsThunks";
import { FormField } from "../../component/FormField";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../component/ButtonComponent";

function AddNewsModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const { typeNews } = useSelector((state) => state.newsReducer);
  const fileInputRef = useRef(null);
  useLayoutEffect(() => {
    if (typeNews.length <= 0) {
      dispatch(getTypeNews());
    }
  }, [dispatch, typeNews.length]);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    image: "",
    type: "", // Thêm type vào formData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Cập nhật file image
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      dispatch(AddNewsThunk(formData)).then((res) => {
        handleClose();
        setFormData({
          title: "",
          link: "",
          image: "",
          type: "", // Đặt lại type khi reset form
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input field to 'Choose File'
        }
      });
    }
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
          onClick={handleClose}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm tin tức</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Input for Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiêu đề
                </label>
                <FormField
                  name="title"
                  values={formData}
                  id="title"
                  setValue={setFormData}
                  required="required"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Input for Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <FormField
                  name="link"
                  values={formData}
                  id="link"
                  setValue={setFormData}
                  required="required"
                  onChange={handleChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Input for Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Select for Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loại tin tức
                </label>
                <select
                  name="type"
                  id="type"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn loại tin tức</option>
                  {typeNews.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                style={
                  "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
           
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewsModal;
