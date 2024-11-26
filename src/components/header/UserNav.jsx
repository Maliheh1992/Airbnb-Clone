import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
function UserNav() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src="/image/userName.png"
            alt="Image of user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
     
      <DropdownMenuContent align="end" className="w-[200px]">

      <DropdownMenuItem>
              <NavLink to="/" className="w-full">
                Home
              </NavLink>
            </DropdownMenuItem>

        {isAuthenticated ? (
          <>
           
           <DropdownMenuItem>
              <NavLink to="/hotels" className="w-full">
                Hotels
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavLink to="/bookmark" className="w-full">
                Bookmarks
              </NavLink>
            </DropdownMenuItem>

           
            <DropdownMenuItem>
              <div onClick={handleLogout}>
                <span>{user.name} LogOut</span>
              </div>
            </DropdownMenuItem>

          </>
        ) : (
          <>
           
            <DropdownMenuItem>
              <NavLink to="/login" className="w-full">
                Login
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
