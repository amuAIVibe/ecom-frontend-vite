import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../../shared/InputField';
import Button from '@mui/material/Button';
import Spinners from '../../shared/Spinners';
import { useDispatch } from 'react-redux';
import { addNewCategoryForDashboard, updateAdminDashboardCategoryAction } from '../../../store/actions';
import toast from 'react-hot-toast';


const AddCategoryForm = ({ setOpen, open, category, update = false }) => {
  
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors}
  } = useForm({
    mode: "onTouched"
  });

  const addNewCategoryHandler = (data) => {
    if(!update) {
      dispatch(addNewCategoryForDashboard(data, toast, reset, setOpen))
    } else {
      dispatch(updateAdminDashboardCategoryAction(data, setOpen, category.id, reset, toast))
    }
  }
  useEffect(()=> {
    if(update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category]);

  
  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(addNewCategoryHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Category Name"
            required
            id="categoryName"
            type="text"
            min={5}
            placeholder="Category Name"
            message="This field is required"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={open}
            onClick={() => setOpen(false)}
            variant="outlined"
            type='button'
            className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
          >
            Cancel
          </Button>
          <Button
            disabled={open}
            type="submit"
            className={`font-metropolis rounded-[5px]  bg-custom-blue hover:bg-blue-800 text-white  py-[10px] px-4 text-sm font-medium`}
          >
            {open ? (
              <div className="flex gap-2 items-center">
                <Spinners/>
                Loading...
              </div>
            ) : update ? 
              "Update"
             : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;