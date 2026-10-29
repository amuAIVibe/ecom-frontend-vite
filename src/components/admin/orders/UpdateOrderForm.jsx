import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Spinners from '../../shared/Spinners';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatusFromAdminDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';

const ORDER_STATUSES = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Accepted"
];

const UpdateOrderForm = ({ setOpen, selectedId, selectedItem, loader, setLoader }) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
  const dispatch = useDispatch();
  const selectedStatus = selectedItem?.orderStatus ?? selectedItem?.status;
  const [orderStatus, setOrderStatus] = useState(selectedStatus || "Accepted");
  const [error, setError] = useState("");

  const orderStatuses = selectedStatus && !ORDER_STATUSES.includes(selectedStatus)
    ? [selectedStatus, ...ORDER_STATUSES]
    : ORDER_STATUSES;

  const updateOrderStatus = (e) => {
    e.preventDefault();
    if(!orderStatus) {
        setError("Order status cannot be empty");
        return;
    }
    dispatch(updateOrderStatusFromAdminDashboard(
        setOpen,
        selectedId,
        orderStatus,
        toast,
        setLoader,
        isAdmin
    ));
 };
  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4' onSubmit={updateOrderStatus}>
            <FormControl fullWidth variant='outlined' error={!!error}>
                <InputLabel id="order-status-label">Order Status</InputLabel>
                <Select
                    labelId="order-status-label"
                    label="Order Status"
                    value={orderStatus}
                    onChange={(e) => {
                        setOrderStatus(e.target.value);
                        setError("");
                    }}
                >
                    {
                        orderStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))
                    }
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
            <div className='flex w-full justify-between items-center absolute bottom-14'>
                <Button 
                    disabled={loader}
                    onClick={()=>setOpen(false)}
                    variant="outlined"
                    className='text-white py-[10px] px-4 text-sm font-medium'
                >
                    Cancel
                </Button>
                <Button
                    disabled={loader}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className='bg-custom-blue text-white  py-[10px] px-4 text-sm font-medium'
                >
                    {loader ? (
                        <div className='flex gap-2 items-center'>
                            <Spinners />Loading...
                        </div>
                    ) : "Update"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default UpdateOrderForm