export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="my-4 rounded-md bg-red-100 p-4 text-red-700">{message}</p>
  );
};
