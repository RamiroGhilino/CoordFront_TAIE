import { ColumnDef } from "@tanstack/react-table";
import PostulationsDialog from "./PostulationsDialog";
import TutorshipsDialog from "./TutorshipDialog";
import Postulations from "@/pages/postulations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const columnsReport = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Apellido y Nombre",
  },
  {
    accessorKey: "profile_picture",
    header: "Fotografía",
    cell: ({ row }) => {
      const profile_picture = row.original.profile_picture;
      console.log(row.original);
      const user_name = row.original.full_name;
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar>
            <AvatarImage src={profile_picture} alt="@student_profile_picture" />
            <AvatarFallback>{user_name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
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
    filterFn: (row, id, values) => {
      //Capitalizo la primera letra del id porque internamente tanstack hace un lowercase
      values = values.map((value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      })
      return values.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      let Icono;
      if (row.original.status === "Done") {
        Icono = <CheckCircledIcon />;
      } else if (row.original.status === "Cancelled") {
        Icono = <CrossCircledIcon />;
      } else {
        Icono = null; // no icon
      }

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icono && <div className="mr-2 h-4 w-4">{Icono}</div>}
          <span>{row.original.status}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <TutorshipsDialog row={row.original} />;
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
    accessorKey: "full_name",
    header: "Apellido y Nombre",
  },
  {
    accessorKey: "profile_picture",
    header: "Fotografía",
    cell: ({ row }) => {
      const profile_picture = row.original.profile_picture;
      const user_name = row.original.full_name;
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar className="align-center">
            <AvatarImage src={profile_picture} alt="@student_profile_picture" />
            <AvatarFallback>{user_name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "careers",
    header: "Carreras",
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: (row, id, values) => {
      //Capitalizo la primera letra del id porque internamente tanstack hace un lowercase
      values = values.map((value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      })
      return values.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      let Icono;
      let text;
      if (row.original.status === "Approved") {
        text = "Aprobado";
        Icono = <CheckCircledIcon />;
      } else if (row.original.status === "Rejected") {
        text = "Rechazado";
        Icono = <CrossCircledIcon />;
      } else if (row.original.status === "Revision") {
        text = "En revisión";
        Icono = <StopwatchIcon />;
      }

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icono && <div className="mr-2">{Icono}</div>}
          <span>{text}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const postulation_row = row.original;

      return <PostulationsDialog row={postulation_row} />;
    },
  },
];
