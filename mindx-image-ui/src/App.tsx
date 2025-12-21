// import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router";
import PostsList from "./pages/PostList";
import ErrorNotPage from "./components/ErrorPage/404";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import { useEffect, useState } from "react";
import request from "./api/request";

import { AuthContext } from "./hook/useAuth";

function App() {
  const [status, setStatus] = useState("idle");
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserInfor = async () => {
      setStatus("loading");
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("done");
        return;
      }
      try {
        const res = await request({
          url: "/auth/me",
          method: "GET",
        });
        if (res.data.success) {
          setUser(res.data);
          console.log(user);
          setStatus("done");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };
    fetchUserInfor();
  }, []);

  if (status === "idle" || status === "loading") return <div>Loading ...</div>;

  if (status === "error") return <div>Error</div>;

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Toaster richColors />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorNotPage />} />

        {/* protected routes */}
        {/* <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/" element={<ChatAppPage />} />
          </Route> */}
      </Routes>
      {/* <PostList></PostList> */}

      {/* <Signup></Signup> */}
      {/* <Navbar></Navbar> */}
    </AuthContext.Provider>
  );
}

export default App;
