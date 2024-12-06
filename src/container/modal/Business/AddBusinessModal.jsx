import { useState } from "react";
import { FormField } from "../../component/FormField";
import { useDispatch } from "react-redux";
import { AddBusinessThunk } from "../../../thunks/BusinessThunk";

function AddBusinessModal({ show, handleClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    business_name: "",
    job_title: "",
    summary: "",
    banner: "",
    post_url: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let formErrors = {};
    if (!data.business_name) formErrors.business_name = "Tên nhà tuyển dụng không được bỏ trống";
    if (!data.job_title) formErrors.job_title = "Tên công việc không được bỏ trống";
    if (!data.summary) formErrors.summary = "Nội dung không được bỏ trống";
    if (!data.banner) formErrors.banner = "Banner không được bỏ trống";
    if (!data.post_url) formErrors.post_url = "Đường link không được bỏ trống";
    return formErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      dispatch(AddBusinessThunk(data)).then((res) => {
        handleClose();
        setData({
          business_name: "",
          job_title: "",
          summary: "",
          banner: "",
          post_url: "",
        });
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
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm ngành học</h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <input
                  type="file"
                  onChange={(e) => setData({ ...data, banner: e.target.files[0] })}
                />
                {errors.banner && (
                  <p className="text-red-500 text-sm">{errors.banner}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên nhà tuyển dụng
                </label>
                <FormField
                  name="business_name"
                  values={data}
                  id="business_name"
                  setValue={setData}
                  required="required"
                  onChange={handleChange}
                  error={errors} // Pass error directly
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên công việc
                </label>
                <FormField
                  name="job_title"
                  values={data}
                  id="job_title"
                  setValue={setData}
                  required="required"
                  onChange={handleChange}
                  error={errors} // Pass error directly
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nội dung
                </label>
                <FormField
                  name="summary"
                  values={data}
                  id="summary"
                  setValue={setData}
                  required="required"
                  onChange={handleChange}
                  error={errors} // Pass error directly
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Đường link
                </label>
                <FormField
                  name="post_url"
                  values={data}
                  id="post_url"
                  setValue={setData}
                  required="required"
                  onChange={handleChange}
                  error={errors} // Pass error directly
                  className="block w-full max-w-md mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <button
              className="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBusinessModal;
