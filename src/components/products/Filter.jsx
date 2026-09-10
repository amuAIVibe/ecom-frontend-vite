import { useState, useEffect } from "react";
import { FiSearch, FiArrowUp, FiRefreshCcw, FiArrowDown } from "react-icons/fi";
import { FormControl, InputLabel, Select, MenuItem, Tooltip, Button } from "@mui/material";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const Filter = ({categories}) => {

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const curentCategory = searchParams.get("category") || "all";
      const currentSortOrder = searchParams.get("sortBy") || "asc";
      const currentSearchTerm = searchParams.get("keyword") || "";

      setCategory(curentCategory);
      setSortOrder(currentSortOrder);
      setSearchTerm(currentSearchTerm); 
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if(searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);
        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params.toString()}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            params.set("sortBy", newOrder);
            navigate(`${pathname}?${params.toString()}`);
            return newOrder;
        });
    };

    const handleClearFilters = () => {
       navigate({ pathname: window.location.pathname });
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px]] w-full">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-700 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-npone focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FiSearch className="absolute left-3 text-gray-800" size={20} />
            </div>

            <div className="flex sm:flex-row flex-col items-center gap-4">
                {/** Category Filter */}
                <FormControl 
                  className="text-slate-800 border-slate-700"
                  variant="outlined" 
                  size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.categoryId} value={category.categoryName}>
                                {category.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/** SORT & CLEAR Filter */}
                <Tooltip title={sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"} arrow>
                    <Button 
                        onClick={toggleSortOrder}
                        variant="contained" color="primary"
                        className="h-10"
                    >
                        Sort By
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={20}/>
                        ) : (
                            <FiArrowDown size={20}/>
                        )}
                    </Button>
                </Tooltip>
                <button
                 className="flex item-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                 onClick={handleClearFilters}
                >
                 <FiRefreshCcw className="font-semibold" size={20} />
                 <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;