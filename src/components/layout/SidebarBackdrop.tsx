/** One abstract leaf: two pointed ends and a soft belly, filled with a low-opacity emerald gradient. */
function Leaf({ id, from, to, className }: { id: string; from: string; to: string; className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 420" className={className} fill="none">
      <defs>
        <linearGradient id={id} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d="M100 0C196 96 192 280 100 420C8 280 4 96 100 0Z" fill={`url(#${id})`} />
      <path d="M100 26C102 130 100 250 100 400" stroke="#a7f3d0" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  )
}

/** Dark botanical backdrop for the sidebar. Decorative: sits behind everything and never takes clicks. */
export function SidebarBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#03100d]" />
      {/* the moving gradient: a tall, dark ramp that slides through the panel */}
      <div className="anim-sidebar-gradient absolute inset-0 bg-[linear-gradient(165deg,#03100d_0%,#052a20_22%,#03100d_44%,#06382a_66%,#03100d_86%,#052a20_100%)] bg-[length:100%_320%]" />

      {/* slow glows */}
      <div className="anim-backdrop-glow absolute -top-24 -left-20 size-72 rounded-full bg-[#064e3b] opacity-45 blur-3xl" />
      <div className="anim-backdrop-glow absolute -right-24 -bottom-28 size-80 rounded-full bg-[#0a6b55] opacity-30 blur-3xl [animation-delay:-9s]" />

      {/* oversized leaves, partly outside the sidebar, kept to the top and bottom so the nav text stays on dark */}
      <div className="anim-leaf-a absolute -top-16 -right-20 opacity-[0.14] blur-[3px]">
        <Leaf id="leaf-a" from="#10b981" to="#064e3b" className="h-[420px] w-[200px] rotate-[32deg]" />
      </div>
      <div className="anim-leaf-b absolute -bottom-24 -left-24 opacity-[0.12] blur-[3px]">
        <Leaf id="leaf-b" from="#087f5b" to="#064e3b" className="h-[460px] w-[220px] -rotate-[28deg]" />
      </div>
      <div className="anim-leaf-a absolute right-2 -bottom-16 opacity-[0.08] blur-[6px] [animation-delay:-7s]">
        <Leaf id="leaf-c" from="#10b981" to="#0a6b55" className="h-[300px] w-[140px] rotate-[18deg]" />
      </div>

      {/* keep the middle, where the navigation text sits, darker than the active item */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(3,16,13,0.6)_30%,rgba(3,16,13,0.6)_62%,transparent_100%)]" />
    </div>
  )
}
