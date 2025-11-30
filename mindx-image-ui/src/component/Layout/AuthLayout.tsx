import { type ReactNode } from "react";


type MainLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: MainLayoutProps) {
  return { children };
}