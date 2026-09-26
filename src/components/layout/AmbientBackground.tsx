/** Very light, slowly drifting emerald glow behind the app. Decorative and non-interactive. */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="anim-drift-a absolute -top-[15%] right-[-8%] size-[46vw] rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="anim-drift-b absolute bottom-[-18%] left-[18%] size-[42vw] rounded-full bg-teal/[0.07] blur-3xl" />
      <div className="anim-drift-c absolute top-[35%] left-[40%] size-[30vw] rounded-full bg-primary/[0.04] blur-3xl" />
    </div>
  )
}
