import { SidebarContent } from '@/layouts/SidebarContent'

/** Fixed sidebar: full width on desktop, icon rail on tablet, hidden on mobile (see MobileDrawer). */
export function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-(--sidebar-width) lg:block">
        <SidebarContent />
      </aside>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-(--sidebar-rail-width) md:block lg:hidden">
        <SidebarContent collapsed />
      </aside>
    </>
  )
}
