import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserStatus from './userStatus.js'; 
import { useRouter } from 'next/router';
import { withAuth } from '../lib/authcheck.js';
import React, { useEffect, useState } from "react";
import { Link } from "next/link";
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
import APIClient from "@/pages/api/apiClient";
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';

const apiClient = APIClient.getInstance();

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { isLoading, data: postulations, error, isError } = useQuery({
    queryKey: ['postulations'],
    queryFn: apiClient.fetchPostulations(),
  });

  console.log("SESION =====> ",session);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="min-h-screen flex flex-col w-screen">
          <div>
            <Navbar />
            <div className="m-6">
              <div className="m-8">
                <h1 className="text-2xl font-bold">Reportes</h1>

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
                          <p>Error al cargar datos</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {postulations.length > 0 ? (
                          postulations.map((postulation) => (
                            <TableRow key={postulation.id}>
                              <TableCell>{postulation.id}</TableCell>
                              <TableCell>
                                {postulation.schedule.tutor_user.first_name}
                              </TableCell>
                              <TableCell>{postulation.schedule.modality}</TableCell>
                              <TableCell>{postulation.date}</TableCell>
                              <TableCell>{postulation.schedule.day}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan="5">
                              <p>No hay postulaciones</p>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
