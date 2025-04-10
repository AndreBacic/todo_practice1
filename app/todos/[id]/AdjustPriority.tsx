"use client";

import { incrementPriority, decrementPriority } from "../actions";
import { useTransition } from "react";

export default function AdjustPriority({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="flex gap-2">
            <button
                onClick={() => startTransition(() => incrementPriority(id))}
                disabled={isPending}
            >
                {isPending ? "Updating..." : "Increase Priority"}
            </button>
            <button
                onClick={() => startTransition(() => decrementPriority(id))}
                disabled={isPending}
            >
                {isPending ? "Updating..." : "Decrease Priority"}
            </button>
        </div>
    );
}