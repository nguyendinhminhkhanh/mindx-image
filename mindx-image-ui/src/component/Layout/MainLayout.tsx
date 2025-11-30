import { type ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <div>
    <div>Nav</div>
    {children}</div>;
}
