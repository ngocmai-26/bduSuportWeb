import { useState, useRef } from "react";
import ButtonComponent from "../../component/ButtonComponent";

function AddFacilityImageModal({ show, handleClose, onSubmit }) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            setError("Vui lòng chọn ảnh");
            return;
        }
        onSubmit(image, () => {
            setImage(null);
            setError("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            handleClose();
        });
    };

    const handleCloseModal = () => {
        setImage(null);
        setError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        handleClose();
    };

    return (
        <div className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="fixed inset-0 bg-black opacity-30" onClick={handleCloseModal}></div>
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Thêm ảnh cơ sở vật chất</h2>
                    <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200" onClick={handleCloseModal}>X</button>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} />
                            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                        </div>
                        <div className="flex justify-end">
                            <ButtonComponent textButton="Tải lên" styleButton="bg-blue-500 text-white px-4 py-2 rounded" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddFacilityImageModal; 