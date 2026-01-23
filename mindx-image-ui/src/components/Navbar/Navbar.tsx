import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../hook/useAuth";
export default function Navbar() {
  const auth = useContext(AuthContext);
  if (auth === null) {
    // Có thể return null, loading, hoặc throw error
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { user, setUser } = auth;
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("Logout");
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Posts</MenubarTrigger>
        <MenubarContent>
          <Link to="/">
            <MenubarItem>Home</MenubarItem>
          </Link>
          <Link to="/posts/create">
            <MenubarItem>
              Create Post
            </MenubarItem>
          </Link> 
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{user?.username}</MenubarTrigger>
        <MenubarContent>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <Link to="/login">
            <MenubarItem inset onClick={handleLogout}>
              LogOut
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
