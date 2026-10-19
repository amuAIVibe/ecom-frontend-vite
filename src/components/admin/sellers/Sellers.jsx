import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SellerTable from './SellerTable';
import { useSellerFilter } from '../../../hooks/useSellerFilter';
import { MdAddShoppingCart } from 'react-icons/md';
import { useState } from 'react';
import AddSellerForm from './AddSellerForm';
import Modal from '../../shared/Modal';


const Sellers = () => {

  const { sellers, pagination } = useSelector((state) => state.sellers);
  const [openAddSellerModal, setOpenAddSellerModal] = useState(false);

  const emptySellers = !sellers || sellers?.length === 0;

  useSellerFilter();

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddSellerModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdAddShoppingCart className="text-xl" />
          Add Product
        </button>
      </div>
      {emptySellers ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <FaShoppingCart size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Orders Placed Yet</h2>
        </div>
      ) : (
        <SellerTable sellers={sellers} pagination={pagination} />
      )}
      <Modal
        open={openAddSellerModal}
        setOpen={setOpenAddSellerModal} 
        title="Add Seller"
      >
        <AddSellerForm
          setOpen={setOpenAddSellerModal}
        />
      </Modal>
    </div>
  );
}

export default Sellers;