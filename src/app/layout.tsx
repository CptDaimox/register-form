import { ColorModeProvider } from "@/components/theme-button/context";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ColorModeProvider>{props.children}</ColorModeProvider>
      </body>
    </html>
  );
}
