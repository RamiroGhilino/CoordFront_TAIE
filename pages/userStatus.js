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

const UserStatus = ({ session }) => {
  const { email } = session.user;
  const router = useRouter(); // Initialize the useRouter hook
  const [areas, setAreas] = useState([]);
  const [tutorshipInstances, setTutorshipInstances] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

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
    <div className="min-h-screen flex flex-col w-full">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
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
                <Loading />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
