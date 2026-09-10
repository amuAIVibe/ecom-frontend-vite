import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from "../shared/Spinners.jsx";
import InputField from '../shared/InputField.jsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addUpdateUserAddress, selectUserCheckoutAddress } from '../../store/actions/index.js';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  
  const noAddressExist = !address || address.length === 0;
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
          register,
          handleSubmit,
          reset,
          setValue,
          formState: {errors},
      } = useForm({
          mode: "onTouched"
   });

   const onSaveAddressHandler = async (data) => {
        //console.log("Login");
       dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ));
    };
  useEffect(() => {
    if(address?.addressId){
        setValue("buildingName", address?.buildingName);
        setValue("city", address?.city);
        setValue("state", address?.state);
        setValue("pincode", address?.pincode);
        setValue("street", address?.street);
        setValue("country", address?.country);
    }
  },[address]);
  return (
    <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className=""
            >
                <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl"/>
                     { noAddressExist ? "Add Address" : "Update Address" }
                </div>
                <div className="flex flex-col gap-4">
                    <InputField 
                        label="Building Name"
                        required
                        message="Building Name is required"
                        id="buildingName"
                        type="text"
                        placeholder="Enter your building name"
                        register={register}
                        errors={errors}
                    />
                    <InputField 
                        label="City"
                        required
                        message="City is required"
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        register={register}
                        errors={errors}
                    />
                    <InputField 
                        label="State"
                        required
                        message="State is required"
                        id="state"
                        type="text"
                        placeholder="Enter State"
                        register={register}
                        errors={errors}
                    />
                    <InputField 
                        label="Pincode"
                        required
                        message="Pincode is required"
                        id="pincode"
                        type="text"
                        placeholder="Enter Pincode"
                        register={register}
                        errors={errors}
                    />
                    <InputField 
                        label="Street"
                        required
                        message="Street is required"
                        id="street"
                        type="text"
                        placeholder="Enter Street"
                        register={register}
                        errors={errors}
                    />
                    <InputField 
                        label="Country"
                        required
                        message="Country is required"
                        id="country"
                        type="text"
                        placeholder="Enter Country"
                        register={register}
                        errors={errors}
                    />
                </div>
                <button
                    disabled={btnLoader}
                    className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
                    type="submit"
                >
                    {btnLoader ? (
                        <><Spinners/></>
                    ) : (
                        <span>Save</span>
                    )}
                </button>
                
            </form>
        </div>
  )
}

export default AddAddressForm