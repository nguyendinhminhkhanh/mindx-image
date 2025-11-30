import { useState } from "react";
import { Menu, Home, User, Settings } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300
      ${open ? "w-64" : "w-16"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 w-full flex items-center hover:bg-gray-800"
      >
        <Menu className="mr-2" />
        {open && <span className="font-semibold">Menu</span>}
      </button>

      {/* Menu Items */}
      <ul className="mt-4 space-y-2">
        <SidebarItem icon={<Home size={20} />} text="Trang chủ" open={open} />
        <SidebarItem icon={<User size={20} />} text="Tài khoản" open={open} />
        <SidebarItem icon={<Settings size={20} />} text="Cài đặt" open={open} />
      </ul>
    </div>
  );
}

function SidebarItem({ icon, text, open }) {
  return (
    <li className="flex items-center p-3 gap-3 cursor-pointer rounded-md hover:bg-gray-800 transition-all">
      {icon}
      {open && <span>{text}</span>}
    </li>
  );
}
