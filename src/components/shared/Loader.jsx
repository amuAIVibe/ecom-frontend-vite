import { RotatingLines } from "react-loader-spinner"

const Loader = ({ text }) => {
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-4">
                <RotatingLines
                    strokeColor="#4fa94d"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
                <p className="text-slate-800 text-lg font-medium">
                    {text ? text : "Please wait..."}
                </p>
            </div>
        </div>
    )
} 

export default Loader;