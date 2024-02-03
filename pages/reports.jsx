import React from 'react';
import { useSession } from 'next-auth/react';
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
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate  from '@/hooks/useAxiosPrivate';


const Reports = () => {
 const { data: session, status } = useSession();
 const axiosPrivate = useAxiosPrivate();

 const { isLoading, data: tutorships, error, isError } = useQuery({
    queryKey: ['tutorships'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/api/tutorship-instances/?role=COORD&page=tutorship_page');
      return response.data;
    },
    staleTime: 0
  });
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="min-h-screen flex flex-col w-screen">
          <div>
            <Navbar />
                <h1 className="my-10 text-2xl font-bold"> Tutorías: Reportes y Reseñas </h1>
                  <div className="m-10 rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Tutor</TableHead>
                          <TableHead>Modalidad</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Día</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan="5">
                              <Loading />
                            </TableCell>
                          </TableRow>
                        ) : isError ? (
                          <TableRow>
                            <TableCell colSpan="5">
                              <p> Error al obtener las postulaciones</p>
                            </TableCell>
                          </TableRow>
                        ) : tutorships.length > 0 ? (
                              tutorships.map((tutorship) => (
                                <TableRow key={tutorship.id}>
                                  <TableCell>{tutorship.id}</TableCell>
                                  <TableCell>
                                    {tutorship.schedule.tutor_user.first_name}
                                  </TableCell>
                                  <TableCell>{tutorship.schedule.modality}</TableCell>
                                  <TableCell>{tutorship.date}</TableCell>
                                  <TableCell>{tutorship.schedule.day}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan="5">
                                  <p>No hay postulaciones</p>
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

export default Reports;
