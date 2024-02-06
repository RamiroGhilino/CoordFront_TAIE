import { ColumnDef } from "@tanstack/react-table";
import PostulationsDialog from "./PostulationsDialog"
import TutorshipsDialog from "./TutorshipDialog";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Postulations from "@/pages/postulations";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


export const columnsReport = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "tutor_name",
        header: "Apellido y Nombre",
    },
    {
        accessorKey: "profile_picture",
        header: "Fotografía",
        cell: ({ row }) => {
            const profile_picture = row.original.profile_picture
            const user_name = row.original.student_name
            return(
                <Avatar>
                    <AvatarImage src={profile_picture} alt="@student_profile_picture" />
                    <AvatarFallback>
                        {user_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )
        }
    },
    {
        accessorKey: "modality",
        header: "Modalidad",
    },
    {
        accessorKey: "date",
        header: "Fecha",
    },
    {
        accessorKey: "area",
        header: "Área",
    },
    {
        accessorKey: "status",
        header: "Estado",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {

          return (
            <TutorshipsDialog 
                row = {row.original}
             />
          )
        },
      },
];

export const columnsPostulations = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "ucc_key",
        header: "Clave UCC",
    },
    {
        accessorKey: "student_name",
        header: "Apellido y Nombre",
    },
    {
        accessorKey: "profile_picture",
        header: "Fotografía",
        cell: ({ row }) => {
            const profile_picture = row.original.profile_picture
            const user_name = row.original.student_name
            return(
                <Avatar>
                    <AvatarImage src={profile_picture} alt="@student_profile_picture" />
                    <AvatarFallback>
                        {user_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )
        }
    },
    {
        accessorKey: "careers",
        header: "Carreras",
    },
    {
        accessorKey: "status",
        header: "Estado",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
          const postulation_row = row.original
     
          return (
            <PostulationsDialog row={postulation_row} />
          )
        },
      },
  ];