/* eslint-disable react/no-unescaped-entities */
import "../scss/style.css";

export const metadata = {
  title: "StudiRent",
  description: "StudiRent the best place to find your home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.4.2/css/all.css"
        />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
