interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <h1>Navbar </h1>
      <div className="container mt-4">{children}</div>
    </div>
  );
}
