import type { Metadata } from 'next'
import type { RFC } from '@/type'
import { cn } from '@/tools/helper'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'RFZ Wedding App',
  description: 'The best app to create your wedding invitation.',
}

const RootLayout: RFC = ({ children }) => {
  return (
    <html lang='en' className='antialiased'>
      <body
        className={cn(
          inter.className,
          'font-inter min-w-[320px] text-base -tracking-base text-black dark:bg-black dark:text-gray-200'
        )}
      >
        {children}
      </body>
    </html>
  )
}

export { metadata }

export default RootLayout
