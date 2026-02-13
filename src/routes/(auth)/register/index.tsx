import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-bold capitalize">register</h1>

      <form className="space-y-4">
        <input
          type="text"
          className="border-gray w-full rounded-md border p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          autoComplete="off"
        />

        <input
          type="text"
          className="border-gray w-full rounded-md border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoComplete="off"
        />

        <input
          type="text"
          className="border-gray w-full rounded-md border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          autoComplete="off"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white capitalize disabled:opacity-50"
        >
          register
        </button>
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
