// import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router";
// import Signup from  "./pages/Signup"
import PostList from "./pages/PostList";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/postlist" element={<PostList />} />

          {/* protected routes */}
          {/* <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/" element={<ChatAppPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      {/* <PostList></PostList> */}

      {/* <Signup></Signup> */}
      {/* <Navbar></Navbar> */}
    </>
  );
}

export default App;
