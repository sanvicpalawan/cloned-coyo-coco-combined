import { ArrowUpRight, BookOpen, CalendarCheck, LayoutDashboard, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Address of the lodge platform (PMS). The platform is a separate application,
 * so this is its own section of the back office — it is intentionally not part
 * of the website content/CMS. Point it at the site's own domain when the
 * platform is served from there.
 */
export const PMS_URL = ((import.meta.env.VITE_PMS_URL as string | undefined) ?? "").trim() || "http://localhost:3100";

const LINKS: { label: string; hint: string; href: string; icon: LucideIcon }[] = [
  { label: "Open dashboard", hint: "Front desk, reservations, housekeeping", href: PMS_URL, icon: LayoutDashboard },
  { label: "Booking page", hint: "The commission-free booking engine", href: `${PMS_URL}/booking/`, icon: CalendarCheck },
  { label: "API reference", hint: "Platform endpoints and integrations", href: `${PMS_URL}/docs`, icon: BookOpen },
];

export function DashboardTab() {
  return (
    <div className="space-y-4 p-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold">Lodge platform</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-zinc-600">
          Reservations, rooms, rates, housekeeping and the front desk run in the lodge platform. This section is kept separate from the website editor.
        </p>
        <ul className="mt-3 space-y-2">
          {LINKS.map(({ label, hint, href, icon: I }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition hover:border-emerald-500 hover:bg-emerald-50",
                  label === "Open dashboard" && "border-emerald-600 bg-emerald-600 text-white hover:border-emerald-500 hover:bg-emerald-500",
                )}
              >
                <I className="size-5 shrink-0" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold">{label}</span>
                  <span className={cn("block text-[11px]", label === "Open dashboard" ? "text-emerald-50" : "text-zinc-500")}>{hint}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[11px] leading-snug text-zinc-500">
        Platform address: <code className="rounded bg-zinc-100 px-1 py-px font-mono">{PMS_URL}</code> — set it with{" "}
        <code className="rounded bg-zinc-100 px-1 py-px font-mono">VITE_PMS_URL</code> when it moves to the site's own domain.
      </p>
    </div>
  );
}
