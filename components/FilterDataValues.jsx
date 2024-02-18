import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const postulation_statuses = [
  {
    value: "revision",
    label: "En Revisión",
    icon: StopwatchIcon,
  },
  {
    value: "rejected",
    label: "Rechazada",
    icon: CrossCircledIcon,
  },
  {
    value: "approved",
    label: "Aprobada",
    icon: CheckCircledIcon,
  },
];

export const tutorship_statuses = [
  {
    value: "cancelled",
    label: "Cancelada",
    icon: CrossCircledIcon,
  },
  {
    value: "done",
    label: "Terminada",
    icon: CheckCircledIcon,
  },
];
