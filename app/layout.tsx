import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MedBills Portal - Medical Expense Management',
  description: 'Streamline your medical expense management with our secure portal system',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}