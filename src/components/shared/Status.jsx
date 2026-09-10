const Status = ({ text, icon:Icon, bg, color }) => {
    return (
        <div
         className={`flex items-center px-2 py-2 rounded gap-1 font-medium ${bg} ${color}`}
        >
            {text} <Icon size={15}/>
        </div>
    )
}

export default Status;