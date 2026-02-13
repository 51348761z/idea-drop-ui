import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRegisterUser } from "@/hooks/auth";
import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/(auth)/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isPending, error } = useRegisterUser();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await mutateAsync({ name, email, password });
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-bold capitalize">register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <ErrorMessage
            message={error instanceof Error ? error.message : "Register failed"}
          />
        )}

        <Label htmlFor="name" className="hidden">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          autoComplete="off"
        />

        <Label htmlFor="email" className="hidden">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoComplete="off"
        />

        <Label htmlFor="password" className="hidden">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="off"
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 capitalize hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
