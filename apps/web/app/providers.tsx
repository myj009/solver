"use client";

import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { connectSocket, disconnectSocket } from "@/lib/socket/index";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const session = useSession();

  useEffect(() => {
    if (session && session.data?.user) {
      const socket = connectSocket(session.data.user.token);
      socket.connect();

      socket.on("connect", () => {
        console.log("Socket connnected", socket.id);
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [session]);

  return <>{children}</>;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>{children}</SocketProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
