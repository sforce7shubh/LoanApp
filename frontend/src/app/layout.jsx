import "./globals.css";

export const metadata = {
  title: "Acme Finance — Personal Loan",
  description: "Check your personal loan offer in under 2 minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}