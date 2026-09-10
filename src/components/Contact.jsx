import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center 
         min-h-screen py-12 bg-cover bg-center"
         style={{backgroundImage: "url('http://images.pexels.com/photos/163065/mobile-phone-android-apps-phone-163065.jpeg?_gl=1*1481jbh*_ga*MTk2NTUyMjc5NC4xNzg2OTI2MTg2*_ga_8JE65Q40S6*czE3ODY5MjYxODYkbzEkZzEkdDE3ODY5MjY1ODQkajUyJGwwJGgw')"}}>
           <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-center text-gray-600 mb-4">
             We would love to hear from you!! Please fill out the form below..
            </p>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-500 rounded-lg 
                        p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="mt-1 block w-full border border-gray-500 rounded-lg 
                        p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        type="message"
                        required
                        className="mt-1 block w-full border border-gray-500 rounded-lg 
                        p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transiton duration-300">
                    Send Message
                </button>
            </form>
            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold">
                    Contact Information
                </h2>
                <div className="flex flex-col items-center space-y-2 mt-4">
                    <div className="flex items-center">
                        <FaPhone className="text-blue-500 mr-2"/>
                        <span className="text-gray-500">
                            +1-647-456-3452
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-blue-500 mr-2"/>
                        <span className="text-gray-500">
                            sb-ecom@mailg.com
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkedAlt className="text-blue-500 mr-2"/>
                        <span className="text-gray-500">
                            423 Main Street, F7T 4U6, Calgary, Alberta, Canada
                        </span>
                    </div>
                </div>
            </div>
           </div>
        </div>
    );
}

export default Contact;