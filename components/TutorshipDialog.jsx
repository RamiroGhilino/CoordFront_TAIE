import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

const TutorshipsDialog = ({ row }) => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const {
    isLoading,
    data: tutorship,
    error,
    isError,
  } = useQuery({
    queryKey: ["Tutorship", row.id],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `/api/tutorship-instances/${row.id}/report-and-reviews/`
      );
      const mappedData = {
        reports: response.data.reports.map((report) => ({
          id: report.id,
          tutor_user: {
            id: report.tutor_user.id,
            first_name: report.tutor_user.first_name,
            last_name: report.tutor_user.last_name,
            profile_picture: report.tutor_user.profile_picture,
            ucc_key: report.tutor_user.ucc_key,
            careers: report.tutor_user.careers,
          },
          comment: report.comment,
          subject: report.subject,
          tutorship_instance: report.tutorship_instance,
        })),
        reviews: response.data.reviews.map((review) => ({
          id: review.id,
          tutor_user: {
            id: review.tutor_user.id,
            first_name: review.tutor_user.first_name,
            last_name: review.tutor_user.last_name,
            profile_picture: review.tutor_user.profile_picture,
            ucc_key: review.tutor_user.ucc_key,
            careers: review.tutor_user.careers,
          },
          student_user: {
            id: review.student_user.id,
            first_name: review.student_user.first_name,
            last_name: review.student_user.last_name,
            profile_picture: review.student_user.profile_picture,
            ucc_key: review.student_user.ucc_key,
            careers: review.student_user.careers,
          },
          comment: review.comment,
          occurred: review.occurred,
          absent: review.absent,
          utility: review.utility,
          tutorship_instance: review.tutorship_instance,
        })),
      };

      return mappedData;
    },
    enabled: open,
  });

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={openDialog}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {isLoading && (
          <DialogContent className="sm:max-w-xl">
            <div>Loading...</div>
          </DialogContent>
        )}
        {tutorship && (
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle> Detalles de la Postulación </DialogTitle>
              <DialogDescription>
                Revisa los datos de la postulación, también puedes aceptarla o
                rechazarla.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 items-center">
              <div className="grid grid-cols-2 gap-4 rounded-md border">
                <div className="flex items-center space-x-4 m-2">
                  <Avatar>
                    <AvatarImage
                      src={postulation.profile_picture}
                      alt="@student_profile_picture"
                    />
                    <AvatarFallback>
                      {postulation.student_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Label
                      className="h-2 w-40 font-bold"
                      htmlFor="student_name"
                    >
                      Nombre del estudiante:
                    </Label>
                    <p className="text-sm font-medium indent-1.5">
                      {postulation.student_name}
                    </p>
                    <Label
                      className="h-2 w-40 font-bold"
                      htmlFor="student_name"
                    >
                      Clave UCC:
                    </Label>
                    <p className="text-sm font-medium indent-1.5">
                      {postulation.ucc_key}
                    </p>
                  </div>
                </div>
                <div className="flex-col items-start  m-2 ">
                  <Label className="h-2 w-40 font-bold" htmlFor="careers">
                    Carreras:
                  </Label>
                  <ul className="text-sm font-medium indent-1.5 overflow-y-auto">
                    {postulation.careers.map((career, index) => (
                      <li key={index}>{career}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default TutorshipsDialog;
