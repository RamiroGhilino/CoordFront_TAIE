import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query'


const UserStatus = ({ session }) => {
  const { email } = session.user;
  const router = useRouter(); // Initialize the useRouter hook
  const [tutorshipInstances, setTutorshipInstances] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = session?.access_token;
  }, [session]);

  return (
    <div
      className="min-h-screen flex flex-col w-screen
    "
    >
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
                {tutorshipInstances.length > 0 ? (
                  tutorshipInstances.map((instance) => (
                    <TableRow key={instance.id}>
                      <TableCell>{instance.id}</TableCell>
                      <TableCell>
                        {instance.schedule.tutor_user.first_name}
                      </TableCell>
                      <TableCell>{instance.schedule.modality}</TableCell>
                      <TableCell>{instance.date}</TableCell>
                      <TableCell>{instance.schedule.day}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5">
                      <Loading />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
