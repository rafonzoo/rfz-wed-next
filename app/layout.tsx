import type { Metadata } from 'next'
import type { RFC } from '@/type'
import { tw } from '@/lib'
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
        className={tw(
          inter.className,
          'font-inter min-w-[320px] text-base -tracking-base text-black dark:bg-black dark:text-white'
        )}
      >
        {children}
      </body>
    </html>
  )
}

export { metadata }

export default RootLayout
