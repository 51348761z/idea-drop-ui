import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRegisterUser } from "@/features/auth";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/(auth)/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerMutation = useRegisterUser();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    registerMutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => navigate({ to: "/" }),
      },
    );
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-bold capitalize">register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {registerMutation.error && (
          <ErrorMessage
            message={
              registerMutation.error instanceof Error
                ? registerMutation.error.message
                : "Register failed"
            }
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

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full"
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
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
