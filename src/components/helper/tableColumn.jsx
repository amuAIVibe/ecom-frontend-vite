import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
//  import { MdOutlineEmail } from "react-icons/md";

export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView
) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "ID",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span className="text-center">ProductID</span>,
  },
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 260,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal text-center",
    renderHeader: (params) => <span>Product Name</span>,
  },

  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span className="text-center">Price</span>,
  },
  {
    disableColumnMenu: true,
    field: "quantity",
    headerName: "Quantity",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span className="text-center">Quantity</span>,
  },
  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Price",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => (
      <span className="text-center">Special Price</span>
    ),
  },
  {
    sortable: false,
    field: "description",
    headerName: "Image",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span className="ps-10">Description</span>,
  },
  {
    sortable: false,
    field: "image",
    headerName: "Image",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span className="ps-10">Image</span>,
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleImageUpload(params.row)}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md"
          >
            <FaImage className="mr-2" />
            Image
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
          <button
            onClick={() => handleProductView(params.row)}
            className="flex items-center bg-slate-800 text-white px-4   h-9 rounded-md"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </div>
      );
    },
  },
];

export const adminCategoryTableColumn = (
  handleEdit,
  handleDelete
) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "ID",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    renderHeader: (params) => <span className="text-center">Category Id</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 500,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal text-center",
    renderHeader: (params) => <span>Category Name</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    flex: 1,
    minWidth: 200,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-10 h-9 rounded-md"
          >
            <FaEdit className="mr-4" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-10 h-9 rounded-md"
          >
            <FaTrashAlt className="mr-4" />
            Delete
          </button>
        </div>
      );
    },
  },
];


export const adminOrderTableColumn = (handleEdit) => [
    { 
        sortable: false,
        diableColumnMenu: true,
        field: "id",
        headerName: "orderId",
        minWidth: 200,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Order ID</span>
     },
     { 
        sortable: false,
        diableColumnMenu: true,
        field: "email",
        headerName: "email",
        minWidth: 200,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Email</span>
     },
    { 
        sortable: false,
        diableColumnMenu: true,
        field: "totalAmount",
        headerName: "totalAmount",
        minWidth: 200,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Total Amount</span>
     },
     { 
        sortable: false,
        diableColumnMenu: true,
        field: "orderStatus",
        headerName: "status",
        minWidth: 200,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Status</span>
     },
    { 
        sortable: false,
        diableColumnMenu: true,
        field: "orderDate",
        headerName: "orderDate",
        minWidth: 200,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Order Date</span>
     },
     { 
        sortable: false,
        diableColumnMenu: true,
        field: "action",
        headerName: "action",
        minWidth: 250,
        flex: 1,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Action</span>,
        renderCell: (params) => {
            return (
                <div className='flex, justify-center items-center space-x-2 h-full pt-2'>
                    <button
                        onClick={() => handleEdit(params.row)}
                        className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'
                    >
                        <FaEdit className='mr-2'/>
                        Edit
                    </button>
                </div>
            );
        }
     }
  ];


  export const adminSellersTableColumn = [
    { 
        sortable: false,
        diableColumnMenu: true,
        field: "id",
        headerName: "id",
        minWidth: 200,
        flex: 1,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Seller ID</span>
     },
     { 
        sortable: false,
        diableColumnMenu: true,
        field: "username",
        headerName: "username",
        minWidth: 200,
        flex: 1,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Username</span>
     },
    { 
        sortable: false,
        diableColumnMenu: true,
        field: "email",
        headerName: "email",
        minWidth: 200,
        flex: 1,
        headerAllign: "center",
        editable: false,
        headerClassName: "text-black font-semibold text-center",
        cellClassName: "text-slate-700 font-normal",
        renderHeader: (params) => <span className='text-center'>Email</span>
     }
  ];