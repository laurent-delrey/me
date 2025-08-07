"use client";

import { useEffect } from "react";
import { registerFancyComponents } from "@/lib/register-fancy-components";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerFancyComponents();
  }, []);

  return <>{children}</>;
}
