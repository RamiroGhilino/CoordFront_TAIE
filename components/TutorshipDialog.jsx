import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import { Review, Report } from "./AccordionReviewAndReport";
import Loading from "./Loading";

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
      const { report = [], reviews = [] } = response.data;

      const mappedData = {
        report: {
          id: report?.id,
          tutor_user: {
            id: report?.tutor_user.id,
            first_name: report?.tutor_user.first_name,
            last_name: report?.tutor_user.last_name,
            profile_picture: report?.tutor_user.profile_picture,
            ucc_key: report?.tutor_user.ucc_key,
            careers: report?.tutor_user.careers,
          },
          comment: report?.comment,
          subject: report?.subject,
          tutorship_instance: report?.tutorship_instance,
        },
        reviews: reviews?.map((review) => ({
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

      console.log("Mapped Data reports and reviews:", mappedData);
      return mappedData;
    },
    enabled: open,
  });

  const openDialog = () => {
    setOpen(true);
  };

  if (isError) {
    setOpen(false);
    toast({
      variant: "destructive",
      title: "Ocurrió un error al cargar los datos",
      description:
        "Inténtalo de nuevo, si el problema persiste, contacta al administrador",
    });
  }

  return (
    <div>
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={openDialog}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {isLoading ? (
          <DialogContent className="sm:max-w-xl">
            <div>
              Loading...
              <Loading />
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Reportes y Reseñas de la Tutoría</DialogTitle>
              <DialogDescription>
                Estas son las devoluciones sobre la tutoría.
              </DialogDescription>
            </DialogHeader>
            {tutorship?.report && tutorship.report.id && (
              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem key="report" value="report">
                    <AccordionTrigger>{"Reporte"}</AccordionTrigger>
                    <AccordionContent>
                      <Report report={tutorship.report} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Separator />
              </div>
            )}
            <div>
              <Accordion type="single" collapsible className="w-full">
                {tutorship?.reviews?.map((review) => (
                  <AccordionItem key={review.id} value={`review-${review.id}`}>
                    <AccordionTrigger>{`Reseña ${review.id}`}</AccordionTrigger>
                    <AccordionContent>
                      <Review review={review} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default TutorshipsDialog;
