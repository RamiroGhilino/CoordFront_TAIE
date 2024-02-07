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
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

// Definimos el esquema de validación con Zod
const FormSchema = z.object({
  message: z.string().min(1, "El comentario es requerido"),
  areas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Es necesario elegir al menos un área.",
  }),
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
        student_name: `${response.data.student_user.last_name}, ${response.data.student_user.first_name}`,
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

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } else {
      // Handle form errors here, such as displaying a message to the user
      console.error("Form has errors", form.formState.errors);
    }
  }

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
        {postulation && (
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
              <div className="grid gap-4 rounded-md border">
                <Form {...form}>
                  <form
                    id="form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="areas"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base"> Áreas </FormLabel>
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
                                    className="flex flex-row items-start space-x-3 space-y-0"
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>

              <DialogFooter>
                <Button form="form" variant="destructive" type="submit">
                  Rechazar
                </Button>
                <Button form="form" type="submit">
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
