import { useAuth } from "@/context/AuthContext";
import { useLogoutUser } from "@/hooks/auth";
import { Link } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { Button } from "./ui/Button";
export const Header = () => {
  const { user } = useAuth();
  const { mutate } = useLogoutUser();

  const handleLogout = () => {
    mutate();
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <Link to="/" className="flex items-center space-x-2 text-gray-800">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold">IdeaDrop</h1>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/ideas"
            className="px-3 py-2 leading-none font-medium text-gray-600 capitalize transition hover:text-gray-900"
          >
            Ideas
          </Link>
          {user && (
            <Link
              to="/ideas/new"
              className="rounded-md bg-blue-600 px-4 py-2 leading-none font-medium text-white transition hover:bg-blue-700"
            >
              + New Idea
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <span className="px-2 font-medium text-gray-700">
                Welcome, {user.name}
              </span>
              <Button variant="danger" onClick={handleLogout}>
                logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 leading-none font-medium text-gray-600 capitalize transition hover:text-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover: rounded-md bg-gray-100 px-4 py-2 leading-none font-medium text-gray-600 capitalize transition hover:text-gray-800"
              >
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
