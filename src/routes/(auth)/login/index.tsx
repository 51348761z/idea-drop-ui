import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useLoginUser } from "@/features/auth";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUserMutation = useLoginUser();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    loginUserMutation.mutate(
      { email, password },
      {
        onSuccess: () => navigate({ to: "/ideas" }),
      },
    );
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-bold capitalize">login</h1>
      {loginUserMutation.error && (
        <ErrorMessage
          message={
            loginUserMutation.error instanceof Error
              ? loginUserMutation.error.message
              : "Login failed"
          }
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Label htmlFor="email" className="hidden" />
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoComplete="off"
        />

        <Label htmlFor="password" className="hidden" />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="off"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loginUserMutation.isPending}
        >
          {loginUserMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 capitalize hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
