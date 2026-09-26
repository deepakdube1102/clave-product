import { Outlet } from 'react-router-dom'

export function MainContent() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-4 pb-6 sm:px-6 lg:px-11 lg:pt-6 lg:pb-10">
        <Outlet />
      </div>
    </main>
  )
}
