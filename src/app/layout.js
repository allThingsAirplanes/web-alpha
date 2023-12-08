
import '@/styles/main.scss'
import Wrapper from '@/components/wrapper/Wrapper'
import Header from '@/components/header/Header'
import Sidebar from '@/components/dashboard/sidebar/Sidebar'

//common code that appears on every page - we want this header to appear
//on every page of the application

export const metadata = {
  title: 'All Things Airplanes',
  description: 'All Things Airplanes',
}

export const dynamic = "force-dynamic"

export const revalidate = 0

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Header />
          <div className="page">
            <div className='page-sidebar'>
              <Sidebar />
            </div>
            <div className='page-content'>
              {children}
            </div>
          </div>
        </Wrapper>
      </body>
    </html>
  )
}
