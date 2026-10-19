import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../../shared/InputField';
import Button from '@mui/material/Button';
import Spinners from '../../shared/Spinners';
import { useDispatch } from 'react-redux';
import { addNewSellerFromAdminDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';


const AddSellerForm = ({ setOpen }) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors}
  } = useForm({
    mode: "onTouched"
  });

  const saveSellerHandler = (data) => {
      //add new seller
      const sendData = {
        ...data,
        role: ['seller']
      };
      dispatch(addNewSellerFromAdminDashboard(
        sendData,
        toast,
        reset,
        setLoader,
        setOpen
      ));
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveSellerHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            placeholder="Enter you username"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="Email field is required"
            placeholder="Enter you email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-[10px] px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue text-white  py-[10px] px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners />
                Loading...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddSellerForm;