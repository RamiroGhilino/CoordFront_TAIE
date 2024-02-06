import React from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { withAuth } from "../lib/authcheck.js";
import DataTable from "@/components/DataTable.jsx";
import { columnsReport } from "@/components/columns";


const Reports = () => {
  const { data: session, status } = useSession();
  const axiosPrivate = useAxiosPrivate();

  const {
    isLoading,
    data: tutorships,
    error,
    isError,
  } = useQuery({
    queryKey: ["tutorships"],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        "/api/tutorship-instances/?role=COORD&page=tutorship_page"
      );
      const mappedData = response.data.map(instance => ({
        id: instance.id,
        tutor_name:
        instance.schedule.tutor_user.last_name +
          ", " +
          instance.schedule.tutor_user.first_name,
        profile_picture: instance.schedule.tutor_user.profile_picture,
        modality: instance.schedule.modality,
        date: instance.date,
        area: instance.area.name,
        status: instance.status,
      }));
      return mappedData;
    },
    staleTime: 0,
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="min-h-screen flex flex-col w-screen">
          <div>
            <Navbar />
            <h1 className="my-10 text-2xl font-bold">
              {" "}
              Tutorías: Reportes y Reseñas{" "}
            </h1>
            <div className="m-10 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columnsReport.map((column) => (
                      <TableHead key={column.accessor}>
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan="8">
                        <Loading />
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell colSpan="8">
                        <p>
                          {" "}
                          Error al obtener las tutorías con sus reportes y
                          reseñas
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : tutorships.length > 0 ? (
                    <DataTable
                      columns={columnsReport}
                      data={tutorships}
                    />
                  ) : (
                    <TableRow>
                      <TableCell colSpan="8">
                        <p>No hay postulaciones con reseñas y/o reportes</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Reports);
