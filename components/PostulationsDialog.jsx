import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

// Definimos el esquema de validación con Zod
const FormSchema = z
  .object({
    approved: z.string().transform((value) => (value === "true" )),
    comentary: z.string().min(1, "El comentario es requerido"),
    areas: z.array(z.string()),
  })
  .refine((data) => data.approved ? data.areas.length > 0 : true,  {
    message: "Debe seleccionar al menos una área.",
    path: ["areas"],
  });

const PostulationsDialog = ({ row }) => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const {
    isLoading,
    data: postulation,
    error,
    isError,
  } = useQuery({
    queryKey: ["postulationDetail", row.id],
    queryFn: async () => {
      const response = await axiosPrivate.get(`api/postulations/${row.id}/`);
      const mappedData = {
        id: response.data.id,
        ucc_key: response.data.student_user.ucc_key,
        full_name: `${response.data.student_user.last_name}, ${response.data.student_user.first_name}`,
        careers: response.data.student_user.careers,
        profile_picture: response.data.student_user.profile_picture,
        status: response.data.status,
        areas: response.data.areas,
        created_at: response.data.created_date,
      };
      return mappedData;
    },
    enabled: open,
  });

  // React Hook Form
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
      areas: [],
    },
  });

  const openDialog = () => {
    setOpen(true);
  };

  function onSubmit(data) {
    if (Object.keys(form.formState.errors).length === 0) {
      setOpen(false);

      axiosPrivate
        .post(
          `/api/postulations/${row.id}/close-postulation/`,
          JSON.stringify({
            approve: data.approved,
            comment: data.comentary,
            areas: data.areas,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast({
              variant: "success",
              title: "Postulación Aceptada",
              description: "La postulación ha sido aprobada correctamente",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Aquí puedes manejar el error de la manera que desees, por ejemplo, mostrando un mensaje de error al usuario
          if (error.response && error.response.status === 409) {
            toast({
              variant: "destructive",
              title: "No es posible aprobar la postulación",
              description:
                "La postulación que inténtas aprobar entra en conflicto con el perfil del estudiante. Si pensas que es un error, comunícate con el administrador.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "¡Algo salió mal!",
              description:
                "Inténtalo de nuevo, si el problema persiste comunicate con el administrador.",
            });
          }
        });
    } else {
      console.error(
        "Error en la validación de aprobación:",
        approvalResult.error
      );
    }
  }

 
  function onError(errors) {
    console.log("ERROR EN FORMULARIO ", errors);
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={openDialog}
        disabled={row.status === "Revision" ? false : true}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {isLoading && (
          <DialogContent className="sm:max-w-xl">
            <div>Loading...</div>
          </DialogContent>
        )}
        {postulation && (
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Detalles de la Postulación</DialogTitle>
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
                      {postulation.full_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Label
                      className="h-2 w-40 font-bold"
                      htmlFor="full_name"
                    >
                      Nombre del estudiante:
                    </Label>
                    <p className="text-sm font-medium indent-1.5">
                      {postulation.full_name}
                    </p>
                    <Label
                      className="h-2 w-40 font-bold"
                      htmlFor="full_name"
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
              <Form {...form}>
                <form id="form" onSubmit={form.handleSubmit(onSubmit, onError)}>
                  <div className="grid gap-4 ">
                    <FormField
                      control={form.control}
                      name="areas"
                      render={() => (
                        <FormItem>
                          <div>
                            <FormLabel className="text-base">Áreas *</FormLabel>
                            <FormDescription>
                              Selecciona las áreas aprobadas sobre las que el
                              tutor puede brindar tutorías.
                            </FormDescription>
                          </div>
                          {postulation.areas.map((area) => (
                            <FormField
                              key={area.id}
                              control={form.control}
                              name="areas"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={area.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 mx-4  "
                                  >
                                    <FormControl>
                                      <Checkbox
                                        defaultChecked={field.value?.includes(
                                          area.name
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                area.name,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== area.name
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {area.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage className="m-4" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="comentary"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mt-4">
                            <FormLabel className="text-base">
                              Comentario *
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Dejá un comentario sobre tu decisión."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="approved"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="resize-none hidden" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  form="form"
                  onClick={() => {
                    form.setValue("approved", "false");
                  }}
                >
                  Rechazar
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    form.setValue("approved", "true");
                  }}
                  form="form"
                >
                  Aprobar
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default PostulationsDialog;
