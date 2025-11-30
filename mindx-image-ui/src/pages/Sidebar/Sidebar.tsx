import Sidebar from "../../component/Navbar/Navbar";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2">Nội dung chính của trang...</p>
      </main>
    </div>
  );
}
