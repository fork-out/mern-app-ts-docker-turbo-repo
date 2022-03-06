import { ChangeEvent, SyntheticEvent, useState } from "react";

import toast from "react-hot-toast";
import { Link, Navigate, useLocation } from "react-router-dom";

import { Spinner } from "../../components/spinner";
import { CredentialsInput, useLoginMutation } from "../../generated/graphql";
import { useAuth } from "../../hooks/use-auth";
import { setAccessToken } from "../../utils/token.utils";

export const Login = () => {
  const location = useLocation();
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const from = (location?.state as any)?.from?.pathname || "/";

  if (currentUser && !loading) {
    return <Navigate to={from} />;
  }

  const handleLoginWithPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await login({
        variables: {
          input: {
            email,
            password
          } as CredentialsInput
        }
      });

      if (data) {
        setCurrentUser(data.login.user);
        setAccessToken(data.login.accessToken);
        toast.success("Successfully logged in.");
      }
    } catch (error: any) {
      console.error(error);
      if (error?.message.includes("user-not-found")) {
        toast.error("User doesn't exist. Contact your administrator.");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="./assets/logo.svg" alt="App Dashboard" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <span className="font-medium text-sky-600 hover:text-sky-500">
            App Dashboard to keep track of tasks
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginPasswordForm loading={loading} onSubmit={handleLoginWithPassword} />
        </div>
      </div>
    </div>
  );
};

const LoginPasswordForm = ({
  loading,
  onSubmit
}: {
  loading?: boolean;
  onSubmit: (email: string, password: string) => void;
}) => {
  const [formData, setformData] = useState<{ password?: string; email?: string }>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name!]: e.target.value
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (formData) {
      onSubmit(formData.email!, formData.password!);
    }
  };

  return (
    <div>
      <div>
        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                required
                autoFocus
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                required
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 space-x-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              {loading && <Spinner />}
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
