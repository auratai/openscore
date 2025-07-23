import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {/* Header with theme toggle */}
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">OpenScore</h1>
              <ThemeToggle />
            </div>
          </header>
          
          {/* Main content */}
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
