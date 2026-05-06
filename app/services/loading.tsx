export default function Loading() {
  return (
    <main className="bg-white text-[var(--foreground)]">
      <section className="bg-[var(--regent-blue-950)] px-4 py-24 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-5 w-48 rounded-full bg-white/20" />
          <div className="mt-6 h-14 max-w-[760px] rounded-full bg-white/20" />
          <div className="mt-4 h-5 max-w-[680px] rounded-full bg-white/15" />
          <div className="mt-10 flex gap-4">
            <div className="h-12 w-44 rounded-full bg-white/20" />
            <div className="h-12 w-40 rounded-full border border-white/30" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
        <div className="mb-12 space-y-4">
          <div className="h-4 w-36 rounded-full bg-[var(--regent-red-soft)]" />
          <div className="h-10 max-w-[620px] rounded-full bg-[var(--surface)]" />
          <div className="h-5 max-w-[860px] rounded-full bg-[var(--surface)]" />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="min-h-[540px] rounded-2xl bg-[var(--regent-blue-950)]/90">
              <div className="flex h-full flex-col justify-end gap-5 p-8 md:p-10">
                <div className="h-9 max-w-[360px] rounded-full bg-white/20" />
                <div className="h-5 max-w-[520px] rounded-full bg-white/15" />
                <div className="h-5 max-w-[420px] rounded-full bg-white/15" />
                <div className="h-12 w-36 rounded-full bg-[var(--regent-red)]/70" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 md:px-12 md:pb-[104px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <div className="aspect-[4/3] bg-[var(--surface)]" />
              <div className="h-20 p-5">
                <div className="h-5 rounded-full bg-[var(--surface)]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
