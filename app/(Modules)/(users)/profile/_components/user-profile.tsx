/* eslint-disable @next/next/no-img-element */
"use client";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/app/(Modules)/(auth)/_hooks/useCurrentUser";
import default_user_image from "@/public/assets/default-user1.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUploadImage } from "../hooks/useUploadImage";
import { useRef, useState } from "react";
import {
  Camera,
  Pencil,
  Shield,
  Trash2,
  Mail,
  User,
  AlertTriangle,
} from "lucide-react";
import { useDeleteUserImage } from "../hooks/useDeleteUserImage";
import LoadingSkeleton from "./loading-skeleton";

const roleConfig: Record<
  string,
  { label: string; classes: string; dotClass: string }
> = {
  ADMIN: {
    label: "Admin",
    classes:
      "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800/50",
    dotClass: "bg-red-500",
  },
  PROVIDER: {
    label: "Provider",
    classes:
      "bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/50",
    dotClass: "bg-amber-500",
  },
  USER: {
    label: "User",
    classes:
      "bg-zinc-100 text-zinc-500 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700/50",
    dotClass: "bg-zinc-400",
  },
};

const UserProfile = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: uploadImage, isPending } = useUploadImage();
  const { mutate: deleteImage, isPending: isPendingDelete } =
    useDeleteUserImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(
      { user_image: file },
      {
        onSuccess: () => toast.success("Profile picture updated!"),
        onError: () => toast.error("Failed to update image."),
      },
    );
  };

  const handleDeleteImage = () => {
    deleteImage(undefined, {
      onSuccess: () => {
        toast.success("Profile picture removed!");
        setShowDeleteConfirm(false);
      },
      onError: () => toast.error("Failed to remove image."),
    });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const displayName = user?.username || user?.email?.split("@")[0] || "User";
  const hasCustomImage =
    user?.userImage && user.userImage !== default_user_image.src;
  const avatarSrc = user?.userImage || default_user_image.src;
  const role = user?.role ?? "USER";
  const {
    label: roleLabel,
    classes: roleClass,
    dotClass,
  } = roleConfig[role] ?? roleConfig.USER;

  return (
    <>
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border/60 rounded-2xl w-full max-w-xs p-6 shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Remove Photo</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This will restore your default avatar.
                </p>
              </div>
              <div className="flex gap-2 w-full pt-1">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteImage}
                  disabled={isPendingDelete}
                  className="flex-1 rounded-xl gap-2"
                >
                  {isPendingDelete ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-start justify-center pt-12 sm:pt-20 px-4 pb-10">
        <div className="w-full max-w-sm space-y-4">
          {/* ── Hero Card ── */}
          <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden">
            {/* Subtle gradient banner */}
            <div className="h-20 " />

            <div className="px-5 pb-5">
              <div className="relative -mt-10 mb-3 flex items-end gap-3">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-card shadow-lg">
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isPending}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/35 transition-colors"
                      title="Change photo"
                    >
                      {isPending ? (
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Camera className="h-3.5 w-3.5 text-white" />
                      )}
                    </button>
                    {hasCustomImage && (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={isPendingDelete}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-red-500/70 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-white" />
                      </button>
                    )}
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Name + role badge aligned to bottom of avatar */}
                <div className="pb-1">
                  <h1 className="text-lg font-semibold text-foreground leading-tight">
                    {displayName}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${roleClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                    {roleLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Account Info Card ── */}
          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="px-4 pt-3.5 pb-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Account Info
              </p>
            </div>
            <div className="divide-y divide-border/40">
              <InfoRow
                icon={<User className="h-3.5 w-3.5" />}
                label="Username"
                value={user?.username || "—"}
              />
              <InfoRow
                icon={<Mail className="h-3.5 w-3.5" />}
                label="Email"
                value={user?.email || "—"}
                truncate
              />
              <InfoRow
                icon={<Shield className="h-3.5 w-3.5" />}
                label="Role"
                value={
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${roleClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                    {roleLabel}
                  </span>
                }
              />
            </div>
          </div>

          {/* ── Edit Button ── */}
          <Button
            variant="outline"
            className="w-full h-11 gap-2 rounded-xl font-medium"
            onClick={() => router.push("/profile/update-profile")}
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </>
  );
};

function InfoRow({
  icon,
  label,
  value,
  truncate = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <div className="flex items-center gap-2 text-muted-foreground shrink-0">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {typeof value === "string" ? (
        <span
          className={`text-sm font-medium text-foreground text-right ${truncate ? "truncate max-w-40" : ""}`}
        >
          {value}
        </span>
      ) : (
        <div className="flex justify-end">{value}</div>
      )}
    </div>
  );
}

export default UserProfile;
