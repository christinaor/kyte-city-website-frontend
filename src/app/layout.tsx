import type { Metadata } from 'next';
import Providers from "@modules/providers"
import { Mulish } from 'next/font/google';
import "styles/globals.css"
import ModalManager from '@modules/modal-manager';

const mulish = Mulish({
  subsets: [],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kyte City',
  description: 'Kyte City website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="light" className={`min-h-screen ${mulish.className}`}>
      <body>
        <Providers>
          <main className="relative">
            <ModalManager />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
