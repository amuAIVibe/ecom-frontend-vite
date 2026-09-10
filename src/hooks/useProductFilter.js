import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page") 
            ? Number(searchParams.get("page")) : 1;

        params.set("pageNumber", currentPage - 1);// Adjust for zero-based indexing in backend

        const sortOrder = searchParams.get("sortBy") || "asc";
        const categoryParams = searchParams.get("category") || "";
        const keyword = searchParams.get("keyword") || "";

        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);
        
        if(categoryParams) {
            params.set("category", categoryParams);
        }

        if(keyword) {
            params.set("keyword", keyword);
        }

        const queryString = params.toString();
        //console.log("Dispatching FETCH_PRODUCTS with query string:", queryString);

        dispatch(fetchProducts(queryString));

    }, [searchParams, dispatch]);

}   

export default useProductFilter;