import { ColorModeProvider } from "@/components/theme-button/context";
import { Roboto } from "next/font/google";

// Define the Roboto font
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ColorModeProvider>{props.children}</ColorModeProvider>
      </body>
    </html>
  );
}
