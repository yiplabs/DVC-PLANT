import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Sproutly — Gamified Garden Community",
  description:
    "A playful community where indie projects grow as plants — water them, complete quests, and pitch live on stream.",
};

// Applies the saved theme before first paint to avoid a light-mode flash.
const themeInit = `(function(){try{var t=localStorage.getItem("sproutly-theme");if(t==="dark")document.documentElement.setAttribute("data-theme","dark");}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.variable}>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
