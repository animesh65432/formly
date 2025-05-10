import React, { useState } from "react";
import Icons from "../../Icons";

const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>("templates");
    const menuItems = [
        { id: "templates", icon: <Icons.Template />, label: "Templates" },
        { id: "forms", icon: <Icons.create />, label: "My Forms" },
        { id: "integrations", icon: <Icons.Integrations />, label: "Integrations" },
        { id: "settings", icon: <Icons.settings />, label: "Settings" }
    ];

    return (
        <div className="h-full flex flex-col bg-white shadow-lg rounded-r-xl p-6 justify-start items-stretch text-green-800">

            <nav className="flex-grow">
                <ul className="space-y-6">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveItem(item.id)}
                                className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 hover:bg-green-50 ${activeItem === item.id
                                    ? "bg-green-100 text-green-700 font-medium shadow-sm transform scale-105"
                                    : "hover:text-green-700"
                                    }`}
                            >
                                <div className={`text-xl ${activeItem === item.id ? "text-green-600" : ""}`}>
                                    {item.icon}
                                </div>
                                <span>{item.label}</span>

                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-green-100">
                <button className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300">
                    <div className="text-xl">
                        {/* Replace with your logout icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </div>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;