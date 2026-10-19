import React, { useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import { adminCategoryTableColumn } from '../../helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import AdminDeleteModal from '../../shared/AdminDeleteModal';
import toast from 'react-hot-toast';
import useCategoryFilter from '../../../hooks/useCategoryFilter';
import { deleteCategoryAdminAction } from '../../../store/actions';
import AddCategoryForm from './AddCategoryForm';

const Category = () => {
  const { categories, pagination } = useSelector((state) => state.products);
  
  const { isLoading, errorMessage } = useSelector((state)=> state.errors);
  const emptyCategory = !categories || categories?.length === 0;

  const [currentPage, setCurrentPage] = useState(
      pagination?.number+1 || 1
    );

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  

  const tableRecords = categories?.map((item) => {
    return {
      id: item.categoryId,
      categoryName: item.categoryName
    };
  });

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(deleteCategoryAdminAction(setOpenDeleteModal, selectedCategory?.id, toast));
  };


  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathName}?${params}`);
  };

  useCategoryFilter();


  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdAddShoppingCart className="text-xl" />
          Add Category
        </button>
      </div>
      {!emptyCategory && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Categories
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyCategory ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">
                No products created yet
              </h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                sx={{
                  "& .MuiDataGrid-cell": {
                    borderRight: "1px solid #cbd5e1",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    borderRight: "1px solid #cbd5e1",
                  },
                  "& .MuiDataGrid-row": {
                    borderBottom: "1px solid #cbd5e1",
                  },
                }}
                className="w-full"
                rows={tableRecords}
                columns={adminCategoryTableColumn( 
                  handleEdit, 
                  handleDelete
                )}
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={[pagination?.pageSixe || 10]}
                disableRowSelectionOnClick
                disableColumnResize
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={ openUpdateModal ? setOpenUpdateModal : setOpenAddModal } 
        title={ openUpdateModal ? 'Update Category' : "Add Category" }
      >
        <AddCategoryForm
          setOpen={ openUpdateModal ? setOpenUpdateModal : setOpenAddModal }
          category={selectedCategory}
          update={openUpdateModal}
        />
      </Modal>
      <AdminDeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal} 
        title={selectedCategory.categoryName}
        loader={loader}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
}

export default Category;