import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchAllSellersForDashboard } from "../store/actions";

export const useSellerFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page") 
            ? Number(searchParams.get("page")) : 1;

        params.set("pageNumber", currentPage - 1);// Adjust for zero-based indexing in backend

        const queryString = params.toString();
        //console.log("Dispatching FETCH_PRODUCTS with query string:", queryString);

        dispatch(fetchAllSellersForDashboard(queryString));

    }, [searchParams, dispatch]);
}