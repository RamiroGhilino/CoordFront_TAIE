"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <div className="grid gap-2">
          <Button disabled={isLoading}>
            Ingresar con Google
          </Button>
        </div>
    </div>
  );
}