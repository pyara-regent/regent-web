export default function Loading() {
  return (
    <main className="bg-white text-[var(--foreground)]">
      <section className="bg-[var(--regent-blue-950)] px-4 py-24 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-5 w-32 rounded-full bg-white/20" />
          <div className="mt-6 h-14 max-w-[720px] rounded-full bg-white/20" />
          <div className="mt-4 h-5 max-w-[620px] rounded-full bg-white/15" />
          <div className="mt-10 h-12 w-52 rounded-full bg-[var(--regent-red)]/70" />
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 md:px-12 md:py-[104px] lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
        <div className="aspect-[4/3] rounded-2xl border border-black/8 bg-white p-6">
          <div className="h-full rounded-xl bg-[var(--surface)]" />
        </div>
        <div className="space-y-6">
          <div className="h-4 w-24 rounded-full bg-[var(--regent-red-soft)]" />
          <div className="h-10 max-w-[440px] rounded-full bg-[var(--surface)]" />
          <div className="space-y-3">
            <div className="h-5 rounded-full bg-[var(--surface)]" />
            <div className="h-5 max-w-[680px] rounded-full bg-[var(--surface)]" />
            <div className="h-5 max-w-[520px] rounded-full bg-[var(--surface)]" />
          </div>
          <div className="h-32 rounded-2xl bg-[var(--surface)]" />
        </div>
      </section>
    </main>
  );
}
