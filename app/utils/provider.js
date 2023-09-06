"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState } from "react";

function Providers({ children }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={ client }>
      <ReactQueryStreamedHydration>{ children }</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}

export default Providers;
