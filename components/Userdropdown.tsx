"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
import { signOut } from "@/lib/actions/auth.action";
const Userdropdown = ({user}:{user:User}) => {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3  text-gray-400 hover:text-yellow-500 "
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/43447656?s=400&u=d46e365f746b40eddc8a7c1be9695e33c7bcd903&v=4" />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
              {user.name}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400 ">
        <DropdownMenuLabel className="flex relative items-center gap-3 py-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://avatars.githubusercontent.com/u/43447656?s=400&u=d46e365f746b40eddc8a7c1be9695e33c7bcd903&v=4" />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-xs font-bold">
              {user.name}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <span className="text-xs font-medium text-gray-400">
              {user.name}
            </span>
            <span className="text-xs  block text-gray-500">{user.email}</span>
          </div>
        </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-600" />
              <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-xs font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                  <LogOut className="h-3 w-3 m-2 hidden sm:block"/>Logout
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-600 hidden sm:block" />
              <nav className="sm:hidden">
                  <NavItems/>
              </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Userdropdown;
