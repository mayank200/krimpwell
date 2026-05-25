import './globals.css';

export const metadata = {
  title: "Krimpwell Electricals",
  description: "A House of Industrial Electricals - Leading trading house in Karnataka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
