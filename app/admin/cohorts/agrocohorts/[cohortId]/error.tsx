"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full flex-col h-[400px] flex items-center justify-center">
      <h2 className="text-xl text-muted-foreground">Something went wrong!</h2>
      <div className="flex space-x-2 text-red-500">
        <p>{error.name}:</p>
        <p> {error.message}</p>
      </div>
      {/* <p className="w-96"> {error.stack}</p> */}
      <button
        className="border shadow px-2 py-1 mt-8"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
