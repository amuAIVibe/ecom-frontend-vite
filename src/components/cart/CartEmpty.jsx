import { MdShoppingCart, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="min-h-[800px] flex flex-col items-center justify-center gap-4">
            <div className="flex items-center flex-col">
                <MdShoppingCart size={100} className="mb-4 text-slate-500"/>
                <div className="text-3xl font-bold tetx-slate-700">
                    Your cart is empty!!
                </div>
                <div className="text-lg font-semibold text-slate-400">
                    Please add some products...
                </div>
            </div>
            <div className="mt-6">
                <Link to="/"
                 className="flex gap-2 items-center mt-2 text-blue-300 hover:text-blue-600 
                  transition duration-500"
                >
                    <MdArrowBack size={30}/>
                    <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
    );
}

export default CartEmpty;