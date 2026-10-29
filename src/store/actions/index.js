import api from '../../api/api';
export const fetchProducts = (queryString) => async (dispatch) =>  {
    try { 
        dispatch({ type: 'IS_FETCHING' });
        const {  data }  = await api.get(`/public/products?${queryString}`);
        dispatch({ 
            type: 'FETCH_PRODUCTS', 
            payload: data.content, // data.content is the array of products returned from the API
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: 'IS_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching products.' 
        });
    }
}

export const fetchCategories = () => async (dispatch) =>  {
    try { 
        dispatch({ type: 'CATEGORY_LOADER' });
        const {  data }  = await api.get(`/public/categories`);
        dispatch({ 
            type: 'FETCH_CATEGORIES', 
            payload: data.content // data.content is the array of categories returned from the API
        })
        dispatch({ type: 'CATEGORY_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching Categories.' 
        });
    }
}

export const fetchCategoriesforAdminDahsboard = (queryString) => async (dispatch) =>  {
    try { 
        dispatch({ type: 'CATEGORY_LOADER' });
        const {  data }  = await api.get(`/admin/categories?${queryString}`);
        dispatch({ 
            type: 'FETCH_CATEGORIES', 
            payload: data.content, // data.content is the array of categories returned from the API
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: 'CATEGORY_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching Categories.' 
        });
    }
}

export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        //Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        //check for stock
        const isQuantityExist = getProduct.quantity >= qty;
        if(isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            
        } else {
            toast.error("Out of Stock");
        }
};

export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrenQuantity) => 
    (dispatch, getState) => {
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;
        if(isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrenQuantity(newQuantity);
            dispatch({
                type: "ADD_CART",
                payload: {
                    ...data, quantity: newQuantity
                }
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantiy reached to limit");
        }

};

export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {
                ...data,
                quantity: newQuantity
            }
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const removeFromeCart = (data, toast) => (dispatch, getState) => {
    dispatch({
        type: "REMOVE_CART",
        payload: data
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    toast.success(`${data?.productName} removed from cart`);
}

export const authenticatetSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try{
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ 
                type: "LOGIN_USER",
                payload: data
            });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server error");
        } finally {
            setLoader(false);
        }
}


export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try{
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server error");
        } finally {
            setLoader(false);
        }
} 

export const logoutUser = (navigate) => (dispatch) => {
    dispatch({
        type: "LOG_OUT"
    });
    localStorage.removeItem("auth");
    navigate("/login");
}

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => 
    async (dispatch, getState) => {
        //const { user } = getState().auth;
        dispatch({
            type: "BUTTON_LOADER"
        });
         try{
            if(addressId){
                const { data } = await api.put(`/addresses/${addressId}`, sendData);
                toast.success(data?.message || "Address updated Successfully");
                dispatch({ type: "IS_SUCCESS" });
            }else{
                const { data } = await api.post("/addresses", sendData);
                toast.success(data?.message || "Address Saved Successfully");
                dispatch({ type: "IS_SUCCESS" });
            }
            dispatch(getUserAddresses());//this is to ensure once user edit address the address list is updated automatically
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server error");
            dispatch({type: "IS_ERROR", payload: null})
        } finally {
            setOpenAddressModal(false);
        }
}

export const getUserAddresses = () => async (dispatch, getState) =>  {
    try { 
        dispatch({ type: 'IS_FETCHING' });
        const {  data } = await api.get(`/addresses`);
        dispatch({ 
            type: 'USER_ADDRESS',
            payload: data
        })
        dispatch({ type: 'IS_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching user addresses.' 
        });
    }
}

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address
    }
}

export const deleteUserAddres = (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) =>  {
    try { 
        dispatch({ type: 'BUTTON_LOADER' });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: 'IS_SUCCESS' });
        dispatch(getUserAddresses());//this is to ensure once user edit address the address list is updated automatically
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while deleting address' 
        });
    } finally {
        setOpenDeleteModal(false);
    }
}

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS"
    };
}

export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMEMT_METHOD",
        payload: method
    }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState) =>  {
    try { 
        dispatch({ type: 'IS_FETCHING' });
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'Failed to create cart items' 
        });
    }
}

export const getUserCart = () => async (dispatch, getState) =>  {
    try { 
        dispatch({ type: 'IS_FETCHING' });
        const { data } = await api.get('/carts/users/cart');
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'Failed to fetch user cart items' 
        });
    }
}

export const createStripePaymentSecret = (sendData, toast) => async (dispatch, getState) => {
        try{
            dispatch({ type: 'IS_FETCHING' });
            const { data } = await api.post("/order/stripe-client-secret", sendData);
            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("clientSecret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
} 

export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {
        try{
            const data = await api.post("/order/users/payments/online", sendData);
            if(data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({type: "REMOVE_CLIENT_SECRET_ADDRESS"});
                dispatch({type: "CLEAR_CART"});
                toast.success("Order Accepted");
            } else {
                setErrorMessage("Payment Failed. Please try again!!");
            }
        } catch (error) {
            setErrorMessage("Payment Failed. Please try again!!");
        }
} 


export const analyticsAction = () => async (dispatch, getState) => {
        try{
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.get('/admin/app/analytics');
            dispatch({
                type: "FETCH_ANALYTICS",
                payload: data
            })
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch analytics data"
            });
        }
} 

export const getOrdersForDashboard = (queryString, isAdmin) => async (dispatch) =>  {
    const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
    try { 
        dispatch({ type: 'IS_FETCHING' });
        const {  data }  = await api.get(`${endpoint}?${queryString}`);
        dispatch({ 
            type: 'GET_ADMIN_ORDERS', 
            payload: data.content, // data.content is the array of products returned from the API
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: 'IS_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching orders.' 
        });
    }
}

export const updateOrderStatusFromAdminDashboard = (setOpen, orderId, orderStatus, toast, setLoader, isAdmin) => 
    async (dispatch) => {
        const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
         try{
            setLoader(true);
            const { data } = await api.put(`${endpoint}/${orderId}/status`, {status: orderStatus});
            toast.success(data.message || "Order status updated successfully");
            await dispatch(getOrdersForDashboard()); // once the order status updated this line of code would automatically dispatch the updated order status from database
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server error");
        } finally {
            setLoader(false);
            setOpen(false);
        }
}

export const fecthDashboardProductsForAdmin = (queryString, isAdmin) => async (dispatch) =>  {
    
    try { 
        dispatch({ type: 'IS_FETCHING' });
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        const {  data }  = await api.get(`${endpoint}?${queryString}`);
        dispatch({ 
            type: 'FETCH_PRODUCTS', 
            payload: data.content, // data.content is the array of products returned from the API
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: 'IS_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching products for Admin Dashboard.' 
        });
    }
}

export const updateAdminDashboardProduct = 
(sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) =>  {
    try {
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        setLoader(true);
        await api.put(`${endpoint}/${sendData.id}`, sendData);
        toast.success("Product updated successfully");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(fecthDashboardProductsForAdmin());
    } 
    catch (error) {
        toast.error(error?.response?.data?.description || "Product update failed!!!");   
    }
}

export const addNewProductForDashboard = (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch, getState) => {
    try {
        const endpoint = isAdmin ? "/admin/categories" : "/seller/categories";
        setLoader(true);
        await api.post(`${endpoint}/${sendData.categoryId}/product`, sendData);
        toast.success("Product has been added successfully");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(fecthDashboardProductsForAdmin());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Product addition failed!!!");
    } finally {
        reset();
        setLoader(false);
        setOpen(false);
    }
}

export const deleteProduct = (setLoader, productId, toast, setOpenDeleteModal, isAdmin) => async (dispatch, getState) =>  {
    try {
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        setLoader(true)
        await api.delete(`${endpoint}/${productId}`);
        toast.success("Product has been deleted from dashboard successfully");
        setLoader(false);
        setOpenDeleteModal(false);
        await dispatch(fecthDashboardProductsForAdmin());
    } 
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.description || "Product deletion failed!!!");
    }
}

export const updateProductImageFromDashboard = 
(formData, productId, toast, setLoader, setOpen, isAdmin) => async (dispatch) =>  {
    try {
        const endpoint = isAdmin ? "/admin/products" : "/seller/products";
        setLoader(true);
        await api.put(`${endpoint}/${productId}/image`, formData);
        toast.success("Image upload successfully");
        setLoader(false);
        setOpen(false);
        await dispatch(fecthDashboardProductsForAdmin());
    } 
    catch (error) {
        toast.error(error?.response?.data?.description || "Product Image upload failed!!!");   
    }
}

export const addNewCategoryForDashboard = (sendData, toast, reset, setOpen) => async (dispatch, getState) => {
    try {
        dispatch({type: "CATEGORY_LOADER"});
        await api.post(`/admin/categories`, sendData);
        dispatch({type: "CATEGORY_SUCCESS"});
        toast.success("Category has been added successfully");
        reset();
        setOpen(false);
        await dispatch(fetchCategoriesforAdminDahsboard());
    } catch (err) {
        toast.error(err?.response?.data?.categoryName || "Category addition failed!!!");
        dispatch({
            type: "IS_ERROR",
            payload: err?.response?.data?.message || "Internal Server Error",
        });
    }
}

export const updateAdminDashboardCategoryAction = 
(sendData, setOpen, categoryId, reset, toast) => async (dispatch) =>  {
    try {
        dispatch({ type: 'CATEGORY_LOADER' });
        await api.put(`/admin/categories/${categoryId}`, sendData);
        dispatch({type: "CATEGORY_SUCCESS"});
        toast.success("Category updated successfully");
        reset();
        setOpen(false);
        await dispatch(fetchCategoriesforAdminDahsboard());
    } 
    catch (error) {
        toast.error(error?.response?.data?.description || "Category update failed!!!");   
    }
}

export const deleteCategoryAdminAction = (setOpen, categoryId, toast) => async (dispatch, getState) =>  {
    try { 
        dispatch({ type: 'CATEGORY_LOADER' });
        await api.delete(`/admin/categories/${categoryId}`);
        dispatch({ type: "CATEGORY_SUCCESS" });
        toast.success("Category has been deleted from dashboard successfully");
        setOpen(false);
        await dispatch(fetchCategoriesforAdminDahsboard());
    } 
    catch (err) {
        toast.error(err?.response?.data?.description || "Category deletion failed!!!");
        dispatch({
            type: "IS_ERROR",
            payload: err?.response?.data?.message || "Internal Server Error",
        });
    }
}


export const fetchAllSellersForDashboard = (queryString) => async (dispatch) =>  {
    try { 
        dispatch({ type: 'IS_FETCHING' });
        const {  data }  = await api.get(`/auth/sellers?${queryString}`);
        dispatch({ 
            type: 'FETCH_SELLERS', 
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: 'IS_SUCCESS' });
    } 
    catch (error) {
        console.log(error);
        dispatch({ 
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message 
                    || 'An error occurred while fetching sellers data.' 
        });
    }
}


export const addNewSellerFromAdminDashboard = (sendData, toast, reset, setLoader, setOpen) => async (dispatch, getState) => {
    try {
        setLoader(true);
        await api.post("/auth/signup", sendData);
        toast.success("Seller has been registered successfully");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(fetchAllSellersForDashboard());
    } catch (error) {
        toast.error(error?.response?.data?.description || "Seller addition failed!!!");
    } finally {
        reset();
        setLoader(false);
        setOpen(false);
    }
}