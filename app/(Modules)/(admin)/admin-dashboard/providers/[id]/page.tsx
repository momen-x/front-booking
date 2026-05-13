import { Badge } from "@/components/ui/badge";
import {
  Building2,
  User,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Hash,
} from "lucide-react";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import ProviderProfile from "../_entities/provider-profile";
import IParams from "@/app/(Modules)/type/params";
import getSingleProviderProfile from "../_utils/getSingleProviders";
import Link from "next/link";

export default async function ProviderProfilePage({ params }: IParams) {
  const { id } = await params;

  const p = (await getSingleProviderProfile(id)) as ProviderProfile;
  if (!p) {
    return <div>Provider not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-10">
        <div className="max-w-3xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {p.businessName}
              </h1>
              {p.location && (
                <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {p.location}
                </p>
              )}
            </div>
          </div>

          <Badge
            className={`gap-1.5 px-3 py-1.5 border-0 shrink-0 ${
              p.isActive
                ? "bg-green-500 hover:bg-green-500 text-white"
                : "bg-white/20 text-white hover:bg-white/20"
            }`}
          >
            {p.isActive ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" /> Active
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5" /> Inactive
              </>
            )}
          </Badge>
          <div>
            <Link href={`/admin-dashboard/providers/${id}/update`}>update</Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {/* About */}
        <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            About
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {p.description || "No description provided yet."}
          </p>
        </div>

        {/* Details */}
        <div className="rounded-2xl border border-border/50 bg-card divide-y divide-border/40 overflow-hidden">
          <Row icon={<Hash className="h-3.5 w-3.5" />} label="Business ID">
            <span className="text-sm font-mono text-foreground break-all">
              {p.id}
            </span>
          </Row>
          <Row icon={<User className="h-3.5 w-3.5" />} label="User ID">
            <span className="text-sm font-mono text-foreground break-all">
              {p.userId}
            </span>
          </Row>
          <Row icon={<MapPin className="h-3.5 w-3.5" />} label="Location">
            <span className="text-sm text-foreground">{p.location || "—"}</span>
          </Row>
          <Row icon={<Calendar className="h-3.5 w-3.5" />} label="Joined">
            <span className="text-sm text-foreground">
              {transformingTheDateToATextString(p.createdAt)}
            </span>
          </Row>
          <Row icon={<Clock className="h-3.5 w-3.5" />} label="Last Updated">
            <span className="text-sm text-foreground">
              {transformingTheDateToATextString(p.updatedAt)}
            </span>
          </Row>
        </div>
      </div>
    </div>
  );
}

// ── Reusable detail row ───────────────────────────────────────────────────────
function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex items-center gap-2 text-muted-foreground shrink-0 text-sm">
        {icon}
        {label}
      </div>
      <div className="text-right">{children}</div>
    </div>
  );
}
