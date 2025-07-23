import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import ButtonComponent from "../../component/ButtonComponent";

function DetailFacilityModal({ show, handleClose, facility, images, onAddImage, onDeleteImage }) {
    console.log("DetailFacilityModal render", { onAddImage });
    return (
        <div className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
                <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Chi tiết cơ sở vật chất</h2>
                    <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200" onClick={handleClose}>X</button>
                    <div className="mb-4">
                        <div className="font-semibold">Tên:</div>
                        <div>{facility?.name}</div>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Mô tả:</div>
                        <div>{facility?.description}</div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold">Danh sách ảnh</div>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { console.log("Button thường được bấm"); onAddImage && onAddImage(); }}>
                                Thêm ảnh
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {images && images.length > 0 ? images.map(img => (
                                <div key={img.id} className="relative group border rounded p-2 flex flex-col items-center">
                                    <img src={img.image_url} alt="facility" className="h-24 w-24 object-cover mb-2" />
                                    <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-80 group-hover:opacity-100" onClick={() => onDeleteImage(img.id)}>X</button>
                                </div>
                            )) : <div className="col-span-3 text-gray-500">Chưa có ảnh</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailFacilityModal; 