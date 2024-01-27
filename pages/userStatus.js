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

    console.log("Access token:", accessToken);
    console.log("session:", session);

    fetch("https://backend-taie.onrender.com/api/token/auth/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
        origin: "page",
      }),
    })
      .then((response) => {
        console.log("Response status:", response);

        if (!response.ok) {
          console.error("Response error:", response.statusText);
          signOut();
          router.push("/");
          return;
        }

        return response.json();
      })
      .then((data) => {
        console.log("New Access Token:", data.access_token);
        fetch(
          "https://backend-taie.onrender.com/api/tutorship-instances/?page=tutorship_page&role=COORD",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        )
          .then((reportsResponse) => reportsResponse.json())
          .then((reportsData) => {
            console.log("Tutorship Reports Data received:", reportsData);
            setTutorshipInstances(reportsData); // Update state variable
          })

          .catch((tutorshipInstancesError) => {
            console.error(
              "Fetch error for Tutorship Instances:",
              tutorshipInstancesError.message
            );
          })
          .finally(() => {
            setLoading(false); // Set loading to false once the data is fetched
          });
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [session, router]);

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
                {console.log("Tutorship Instances:", tutorshipInstances)}
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
