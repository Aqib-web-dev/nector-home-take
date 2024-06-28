"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default ClientLayout;
