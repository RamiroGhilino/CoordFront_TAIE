import { useSession } from 'next-auth/react';
import { withAuth } from '../lib/authcheck.js';
import React, { useEffect, useState } from "react";
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


const Postulations = () => {
  const { data: session, status } = useSession();
  const axiosPrivate = useAxiosPrivate();

  const { isLoading, data: postulations, error, isError } = useQuery({
    queryKey: ['postulations'],
    queryFn: async () => {
      const response = await axiosPrivate.get('api/postulations/');
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
              <h1 className="my-10 text-2xl font-bold"> Postulaciones </h1>
                <div className="m-10 rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">ID</TableHead>
                        <TableHead className="text-center">Clave UCC</TableHead>
                        <TableHead className="text-center">Apellido y Nombre</TableHead>
                        <TableHead className="text-center">Careras</TableHead>
                        <TableHead className="text-center">Status</TableHead>
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
                      ) : postulations.length > 0 ? (
                            console.log(postulations),
                            postulations.map((postulation) => (
                              <TableRow key={postulation.id}>
                                <TableCell>{postulation.id}</TableCell>
                                <TableCell>{postulation.student_user.ucc_key}</TableCell>
                                <TableCell>
                                  {postulation.student_user.last_name + ", " + postulation.student_user.first_name}
                                </TableCell>
                                <TableCell>{postulation.student_user.careers.join(", ")}</TableCell>
                                <TableCell>{postulation.status}</TableCell>
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

export default withAuth(Postulations);
