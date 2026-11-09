"use client";

import EditDestinationDialog from "./EditDestinationDialog";
import type { Destination } from "@/types/destination";
import DeleteDestinationDialog from "./DeleteDestinationDialog";

interface DestinationActionsProps {
  destination?: Destination | null;
}

export function DestinationActions({ destination }: DestinationActionsProps) {



  return (
    <div className="flex items-center gap-2.5">

      <EditDestinationDialog destination={destination} />

      <DeleteDestinationDialog destination={destination} />
    </div>
  );
}
