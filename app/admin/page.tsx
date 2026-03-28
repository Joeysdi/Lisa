import { createClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hasSupabase) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/40 font-mono text-sm">Supabase not configured.</p>
      </main>
    );
  }

  const db = getAdminSupabase();

  const [signupsRes, applicationsRes, demoRes, campaignRes] = await Promise.all([
    db.from("signups").select("*").order("created_at", { ascending: false }),
    db.from("creator_applications").select("*").order("created_at", { ascending: false }),
    db.from("demo_requests").select("*").order("created_at", { ascending: false }),
    db.from("campaign_requests").select("*").order("created_at", { ascending: false }),
  ]);

  const signups = signupsRes.data ?? [];
  const applications = applicationsRes.data ?? [];
  const demos = demoRes.data ?? [];
  const campaigns = campaignRes.data ?? [];

  const proCount = signups.filter((s: Record<string, unknown>) => s.plan === "pro").length;

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <header className="border-b border-white/8 px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-xs tracking-[.4em] uppercase">LISA</span>
          <span className="w-px h-4 bg-white/15" />
          <span className="text-[9px] tracking-[.2em] uppercase text-white/40">ADMIN</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-white/40">
          <span>{signups.length} signups</span>
          <span className="text-white/70">{proCount} pro</span>
          <span>{applications.length} applications</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col gap-12">

        {/* Signups */}
        <Section title="Signups" count={signups.length}>
          <Table
            cols={["Email", "Role", "Plan", "Source", "Date"]}
            rows={signups.map((s: Record<string, unknown>) => [
              String(s.email ?? ""),
              String(s.role ?? ""),
              <PlanBadge key={String(s.id)} plan={String(s.plan ?? "free")} />,
              String(s.source ?? ""),
              fmt(String(s.created_at)),
            ])}
          />
        </Section>

        {/* Creator Applications */}
        <Section title="Creator Applications" count={applications.length}>
          <Table
            cols={["Name", "Email", "Role", "Tier", "Status", "Date"]}
            rows={applications.map((a: Record<string, unknown>) => [
              String(a.full_name ?? ""),
              String(a.email ?? ""),
              String(a.role ?? ""),
              String(a.pricing_tier ?? ""),
              <StatusBadge key={String(a.id)} status={String(a.status ?? "pending")} />,
              fmt(String(a.created_at)),
            ])}
          />
        </Section>

        {/* Demo Requests */}
        <Section title="Demo Requests" count={demos.length}>
          <Table
            cols={["Name", "Email", "Role", "Social", "Date"]}
            rows={demos.map((d: Record<string, unknown>) => [
              `${d.first_name ?? ""} ${d.last_name ?? ""}`.trim(),
              String(d.email ?? ""),
              String(d.role ?? ""),
              String(d.social ?? ""),
              fmt(String(d.created_at)),
            ])}
          />
        </Section>

        {/* Campaign Requests */}
        <Section title="Campaign Requests" count={campaigns.length}>
          <Table
            cols={["Brand", "Email", "Budget", "Creator Type", "Date"]}
            rows={campaigns.map((c: Record<string, unknown>) => [
              String(c.brand_name ?? ""),
              String(c.contact_email ?? ""),
              String(c.budget ?? ""),
              String(c.creator_type ?? ""),
              fmt(String(c.created_at)),
            ])}
          />
        </Section>

      </div>
    </main>
  );
}

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xs tracking-[.2em] uppercase text-white/60">{title}</h2>
        <span className="text-white/25 font-mono text-xs">{count}</span>
      </div>
      {count === 0 ? (
        <p className="text-white/20 font-mono text-xs py-4">No records yet.</p>
      ) : (
        children
      )}
    </div>
  );
}

function Table({
  cols,
  rows,
}: {
  cols: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto border border-white/8">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/8">
            {cols.map(col => (
              <th
                key={col}
                className="text-left px-4 py-3 font-mono text-white/25 tracking-[.1em] uppercase whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-white/50 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const isPro = plan === "pro";
  return (
    <span
      className={`font-mono text-[9px] tracking-[.15em] px-2 py-0.5 uppercase ${
        isPro ? "bg-white text-black" : "text-white/25"
      }`}
    >
      {isPro ? "PRO" : "FREE"}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "text-white/40",
    active: "text-white/80",
    rejected: "text-white/20",
  };
  return (
    <span className={`font-mono text-[9px] tracking-[.15em] uppercase ${colors[status] ?? "text-white/40"}`}>
      {status}
    </span>
  );
}
