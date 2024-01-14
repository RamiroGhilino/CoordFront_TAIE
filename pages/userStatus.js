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

const UserStatus = ({ session }) => {
  const { email } = session.user;
  const [areas, setAreas] = useState([]);
  const [tutorshipInstances, setTutorshipInstances] = useState([]);

  useEffect(() => {
    const accessToken = session?.access_token;

    console.log("Access token:", accessToken);
    console.log("session:", session);

    console.log("Fetching data...");

    fetch("https://backend-taie.onrender.com/api/token/auth/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    })
      .then((response) => {
        console.log("Response status:", response);

        if (!response.ok) {
          console.error("Response error:", response.statusText);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);

        // Agregar un nuevo console log para el nuevo token de acceso
        console.log("New Access Token:", data.access_token);

        // Hacer una nueva solicitud para obtener las áreas con el nuevo token de acceso
        fetch("https://backend-taie.onrender.com/api/areas/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        })
          .then((areasResponse) => areasResponse.json())
          .then((areasData) => {
            console.log("Areas Data received:", areasData);
            setAreas(areasData);
          })
          .catch((areasError) => {
            console.error("Fetch error for Areas:", areasError.message);
          });

        fetch(
          "https://backend-taie.onrender.com/api/tutorship-instances/?page=calendar&role=STD",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        )
          .then((tutorshipInstancesResponse) =>
            tutorshipInstancesResponse.json()
          )
          .then((tutorshipInstancesData) => {
            console.log(
              "Tutorship Instances Data received:",
              tutorshipInstancesData
            );
            setTutorshipInstances(tutorshipInstancesData);
          })
          .catch((tutorshipInstancesError) => {
            console.error(
              "Fetch error for Tutorship Instances:",
              tutorshipInstancesError.message
            );
          });
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="m-6">
        <Card>
          <CardTitle className="m-4">
            Signed in as {email}
            <CardDescription className="m-2">
              <Button onClick={() => signOut()} variant="outline">
                Sign out
              </Button>
            </CardDescription>
          </CardTitle>
        </Card>
        <div className="m-8">
          <h1 className="text-2xl font-bold">Areas</h1>

          {areas.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas.map((area) => (
                  <TableRow key={area.id}>
                    <TableCell>{area.id}</TableCell>
                    <TableCell>{area.name}</TableCell>
                    <TableCell>{area.tags.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Loading...</p>
          )}

          {tutorshipInstances.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Area Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tutorshipInstances.map((instance) => (
                  <TableRow key={instance.id}>
                    <TableCell>{instance.id}</TableCell>
                    <TableCell>{instance.date}</TableCell>
                    <TableCell>{instance.area.name}</TableCell>
                    <TableCell>{instance.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
