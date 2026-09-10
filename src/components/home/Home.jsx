import HeroBanner from "./HeroBanner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
  );
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div 
     className="lg:px-14 sm:px-8 px-4"
     style={{backgroundImage: "url('https://images.pexels.com/photos/6985193/pexels-photo-6985193.jpeg?_gl=1*fxts0y*_ga*MTk2NTUyMjc5NC4xNzg2OTI2MTg2*_ga_8JE65Q40S6*czE3ODY5MjYxODYkbzEkZzEkdDE3ODY5MjcyMjgkajYwJGwwJGgw')"}}
    >
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800 text-center">
            Products
          </h1>
          <span className="text-slate-700 text-center">
            Discover our handpicked top-quality products, curated to meet your
            lifestyle.
          </span>
        </div>
        {isLoading ? (
          <Loader text="Loading products..." />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                ?.slice(0, 8)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;