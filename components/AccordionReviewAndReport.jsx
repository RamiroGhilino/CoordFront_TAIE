import React from "react";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import UserData from "./UserDataComponent";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

const Star = ({ filled }) => {
  return filled ? (
    <StarFilledIcon className="h-5 w-5 inline-block" />
  ) : (
    <StarIcon className="h-5 w-5 inline-block" />
  );
};

// Componente para renderizar la información de una revisión
const Review = ({ review }) => {
  const [starCount, setStarCount] = useState(review.utility);

  return (
    <AccordionContent>
      <div>
        <UserData user={review.student_user} />
        <div className="grid  gap-3  m-2">
          <div className="flex flex-row">
            <div className="basis-1/3">
              <Label className="y-2 w-40 font-bold" htmlFor="comment">
                Dictada:
              </Label>
              <p className="text-sm font-medium indent-1.5">
                {review.occurred ? "Sí" : "No"}
              </p>
            </div>
            <div className="basis-1/3">
              <Label className="y-2 w-40 font-bold" htmlFor="comment">
                Presente:
              </Label>
              <p className="text-sm font-medium indent-1.5">
                {review.absent ? "No" : "Sí"}
              </p>
            </div>
            <div>
              <div className="basis-1/3">
                <Label className="y-2 w-40 font-bold" htmlFor="comment">
                  Utilidad:
                </Label>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} filled={index < starCount} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Label className="h-2 w-40 font-bold" htmlFor="comment">
            Comentario:
          </Label>
          <p className="text-sm font-medium indent-1.5">{review.comment}</p>
        </div>
      </div>
    </AccordionContent>
  );
};

// Componente para renderizar la información de un reporte
const Report = ({ report }) => {
  return (
    <div>
      <AccordionContent>
        <div>
          <UserData user={report.tutor_user} />
          <div className="grid flex-grid gap-4  m-2">
            <Label className="h-2 w-40 font-bold" htmlFor="comment">
              Contenido dictado:
            </Label>
            <p className="text-sm font-medium indent-1.5">{report.subject}</p>
            <Label className="h-2 w-60 font-bold" htmlFor="comment">
              Comentario de la tutoría:
            </Label>
            <p className="text-sm font-medium indent-1.5">{report.comment}</p>
          </div>
        </div>
      </AccordionContent>
    </div>
  );
};

export { Review, Report };
