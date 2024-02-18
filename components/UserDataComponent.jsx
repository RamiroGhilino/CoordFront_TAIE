import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

const UserData = ({ user }) => {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-md ">
      <div className="flex items-center space-x-4 m-2">
        <Avatar>
          <AvatarImage src={user.profile_picture} alt="Avatar" />
          <AvatarFallback>
            {user.first_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <Label className="h-2 w-40 font-bold" htmlFor="full_name">
            Nombre del estudiante:
          </Label>
          <p className="text-sm font-medium indent-1.5">
            {user.last_name}, {user.first_name}
          </p>
          <Label className="h-2 w-40 font-bold" htmlFor="full_name">
            Clave UCC:
          </Label>
          <p className="text-sm font-medium indent-1.5">{user.ucc_key}</p>
        </div>
      </div>
      <div className="flex-col items-start m-2">
        <Label className="h-2 w-40 font-bold" htmlFor="careers">
          Carreras:
        </Label>
        <ul className="text-sm font-medium indent-1.5 overflow-y-auto">
          {user.careers.map((career, index) => (
            <li key={index}>{career}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserData;
