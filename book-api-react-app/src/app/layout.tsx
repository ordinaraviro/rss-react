import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'BookApiApp',
    description: 'My App is a books api app',
  }
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <html lang="en">
  <body>
    <div id="root">{children}</div>
  </body>
</html>
    )
  }