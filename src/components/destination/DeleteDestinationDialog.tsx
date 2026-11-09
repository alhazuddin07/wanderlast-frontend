"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import type { Destination } from "@/types/destination";
import { authClient } from "@/lib/auth-client";

const DeleteDestinationDialog = ({ destination }: { destination?: Destination | null }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeleteDestination = async () => {
        if (!destination?._id) {
            toast.add({
                type: "error",
                title: "Error",
                description: "Destination ID not found!",
            });
            return;
        }

        const { data } = await authClient.token();
        const token = data?.token


        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to delete package");
            }

            toast.add({
                type: "success",
                title: "Delete package",
                description: "Package deleted successfully!",
            });

            setOpen(false);
            router.push("/destinations");
            router.refresh();
        } catch (error) {
            console.error("Delete error:", error);
            toast.add({
                type: "error",
                title: "Delete failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger render={<Button
                    variant="outline"
                    className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-red-500 shadow-2xs transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 cursor-pointer"
                >
                    <Trash2 />
                    Delete
                </Button>}>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this travel destination package.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteDestination} disabled={loading}>
                            {loading ? "Deleting..." : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};
export default DeleteDestinationDialog;