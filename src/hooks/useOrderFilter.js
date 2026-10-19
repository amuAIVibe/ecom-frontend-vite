import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, getOrdersForDashboard } from "../store/actions";

const useOrderFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page") 
            ? Number(searchParams.get("page")) : 1;

        params.set("pageNumber", currentPage - 1);// Adjust for zero-based indexing in backend

        const queryString = params.toString();
        
        dispatch(getOrdersForDashboard(queryString));

    }, [searchParams, dispatch]);

}

export default useOrderFilter;