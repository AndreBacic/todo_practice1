"use client";

import { useOptimistic } from "react";
import { incrementPriority, decrementPriority } from "../actions";

export default function OptimisticPriority({ id, priority }: { id: string; priority: number }) {
    const [optimisticPriority, setOptimisticPriority] = useOptimistic(
        {priority, sending: false}, 
        (state, newPriority: number) => ({
        ...state,
        priority: newPriority,
        sending: true,
    })
);

    return (
        <div className="flex gap-2 my-4 border-gray-600 border-2 p-4 rounded-md">
            <p>Priority: {optimisticPriority.priority}
                {optimisticPriority.sending && " (updating)"}
            </p>
            <button
                onClick={() => {setOptimisticPriority(priority + 1); incrementPriority(id)}}
                disabled={optimisticPriority.sending}
            >
                {optimisticPriority.sending ? "Updating..." : "Increase Priority"}
            </button>
            <button
                onClick={() => {setOptimisticPriority(priority - 1); decrementPriority(id)}}
                disabled={optimisticPriority.sending}
            >
                {optimisticPriority.sending ? "Updating..." : "Decrease Priority"}
            </button>
        </div>
    );
}