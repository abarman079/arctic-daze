"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type RemoveRestockAlertButtonProps = {
  alertId: string;
};

export function RemoveRestockAlertButton({
  alertId,
}: RemoveRestockAlertButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    if (loading) return;

    setLoading(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(
        "/login?redirectTo=/account/restock-alerts",
      );
      return;
    }

    const { error } = await supabase
      .from("restock_alerts")
      .delete()
      .eq("id", alertId)
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ad-border)] bg-[var(--ad-card)] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ad-text-soft)] hover:border-[var(--ad-accent)] disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />

      {loading ? "Removing..." : "Remove Alert"}
    </button>
  );
}