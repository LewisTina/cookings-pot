"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from 'next-themes'
import { AlertProvider } from "../alert";
import { UserSessionProvider } from "../user_session";

export default function Providers({ children }: React.PropsWithChildren) {
    const queryClient = useState(() => new QueryClient({
      defaultOptions: {
        queries: {
          retryDelay: 10 * 1000,
          refetchOnWindowFocus: false
        },
        mutations: {
          retry: false
        },
      }
    }))[0];

    return (
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <UserSessionProvider>
            <AlertProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
            </AlertProvider>
          </UserSessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
}