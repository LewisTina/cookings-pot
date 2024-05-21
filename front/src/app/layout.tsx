import type { Metadata, Viewport } from 'next'
import '../styles/globals.scss'
import Providers from '@/context/providers';

export const metadata: Metadata = {
  title: {
    default: "Cooking Pot's",
    template: "%s | Cooking Pot's"
  },
  description: "Cooking Pot's blog"
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html  lang={"fr"}>
        <body>
          <Providers>
            <main className="h-[100dvh] w-full relative flex flex-col items-center">
                {children}
            </main>
          </Providers>
        </body>
      </html>
    )
}
