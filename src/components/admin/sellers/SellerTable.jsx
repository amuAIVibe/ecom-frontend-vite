import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
//import { adminOrderTableColumn } from '../../helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { adminSellersTableColumn } from '../../helper/tableColumn';
//import Modal from '../../shared/Modal';

const SellerTable = ({ sellers, pagination }) => {
//   const [updateOpenModal, setUpdateOpenModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("");
//   const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const tableRecords = sellers?.map((seller) => {
    return {
      id: seller.userId,
      username: seller.username,
      email: seller.email
    };
  });
  
  const [currentPage, setCurrentPage] = useState(
    pagination?.number+1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathName}?${params}`);
  };



  return (
    <div>
      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
        All Sellers
      </h1>

      <div>
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
          paginationMode="server"
          rowCount={pagination?.totalElements || 0}
          columns={adminSellersTableColumn}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pagination?.pageSize || 10,
                page: currentPage - 1,
              },
            },
          }}
          onPaginationModelChange={handlePaginationChange}
          pageSizeOptions={[pagination?.pageSixe || 5]}
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
    </div>
  );
}

export default SellerTable;