import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-currentuser";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    resolve();
  });
}

export function UserButton() {
  const { user, isLoading, isError, error } = useCurrentUser();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <Button variant="ghost" className="size-8 rounded-full" disabled>
          <Avatar className="size-8">
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    );
  }

  // Show error state
  if (isError) {
    console.error("User data error:", error);
    return (
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <Button variant="ghost" className="size-8 rounded-full" disabled>
          <Avatar className="size-8">
            <AvatarFallback>!</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user?.profilePicture || ""}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="text-sm font-medium ">{user?.displayName}</div>
                <div className="text-sm font-medium ">{user?.email}</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={googleSignIn}>Get Started</Button>
        </>
      )}
    </div>
  );
}
