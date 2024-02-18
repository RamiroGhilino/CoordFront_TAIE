import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import UserSignOut from "@/hooks/singOutUser"
import { useSession } from "next-auth/react"


const UserPopOver = () => {
  const { data: session, status } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.user?.image} alt="@account_profile_picture" />
          <AvatarFallback>
            {session?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-40 flex flex-col items-center"> 
        <div className="grid gap-4">
          <div className="flex flex-col space-y-3">
            <p className="text-base font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
          <Separator />
            <div className="grid gap-4 flex items-center justify-center"> 
              <UserSignOut />
            </div>
        </div>

      </PopoverContent>
    </Popover>
  )
}

export default UserPopOver;
