import React from 'react'
import { FaBuilding, FaCheckCircle, FaCity, FaStreetView, FaEdit, FaTrash } from 'react-icons/fa';
import { MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserCheckoutAddress } from '../../store/actions';

const AddressList = ({
    addresses,
    setSelectedAddress,
    setOpenAddressModal,
    setOpenDeleteModal
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state)=> state.auth);

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  const onEditButtonHandler = (address  ) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          className={`p-4 border rounded-md cursor-pointer relative ${
            selectedUserCheckoutAddress?.addressId === address.addressId
              ? "bg-green-100"
              : "bg-white"
          }`}
          key={address.addressId}
          onClick={() => handleAddressSelection(address)}
        >
          <div className="flex items-start">
            <div className="space-y-1">
              <div className="flex items-center">
                <FaBuilding size={14} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.buildingName}</p>
                {selectedUserCheckoutAddress?.addressId === address.addressId && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>
              <div className="flex items-center">
                <FaStreetView size={17} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.street}</p>
              </div>
              <div className="flex items-center">
                <FaCity size={17} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.city}</p>
              </div>
              <div className="flex items-center">
                <MdPinDrop size={17} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.pincode}</p>
              </div>
              <div className="flex items-center">
                <MdPublic size={17} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.country}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 absolute top-4 right-2">
            <button onClick={() => onEditButtonHandler(address)}>
              <FaEdit size={18} className="text-teal-700" />
            </button>
            <button onClick={() => onDeleteButtonHandler(address)}>
              <FaTrash size={18} className="text-rose-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddressList