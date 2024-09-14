import localFont from "next/font/local"
import {Inter, Italianno} from "next/font/google"
import "./globals.css"
import { FormProvider } from '@/app/context/formContext'

const inter = Inter({ subsets: ['latin'] })
const italianno = Italianno({ subsets: ['latin'] ,weight: '400'})

export const metadata = {
  title: "Sapphire Survey",
  description: "Your Journey Awaits",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={[inter.className, italianno.className]}
      >
        <FormProvider>
        {children}
        </FormProvider>
      </body>
    </html>
  );
}
