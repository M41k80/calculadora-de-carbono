"use client";

const Sidebar = () => {

    return (
        <aside className="mt-6 mb-6 w-40 h-screen bg-[#212226] text-white flex flex-col p-4 rounded-full shadow-lg">
        <div className="flex items-center justify-center mb-4">
            <img alt="" className="w-24 h-24 rounded-full" />
        </div>
        <nav className="flex flex-col gap-2 mt-4">
            <a href="#" className="hover:bg-gray-700 p-2 rounded">Link 1</a>
            <a href="#" className="hover:bg-gray-700 p-2 rounded">Link 2</a>
            <a href="#" className="hover:bg-gray-700 p-2 rounded">Link 3</a>
        </nav>
        </aside>
    );
 }


export default Sidebar;