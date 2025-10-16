import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

import { LogOutIcon, UserIcon } from "lucide-react";

import Link from "next/link";
import { auth, signOut } from "../../../auth";

const Header = async () => {
  const session = await auth()

  return (
    <div className="py-4 space-y-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">
            <Link href="/">
              OCR Invoice
            </Link>
          </h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar_profile.png" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="p-1">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <h2 className="text-md font-semibold">
                    {session?.user?.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-500">
                  {session?.user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  "use server"
                  await signOut({ redirectTo: "/signin" })
                }}
              >
                <LogOutIcon />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Header;