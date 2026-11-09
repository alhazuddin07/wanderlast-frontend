
"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pencil, PackageCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Destination } from "@/types/destination";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const categories = [
    "beach",
    "mountain",
    "city",
    "adventure",
    "cultural",
];

const EditDestinationDialog = ({ destination }: { destination?: Destination | null }) => {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [draft, setDraft] = useState<{
        destinationId: string;
        values: Partial<Destination>;
    } | null>(null);

    const form = destination
        ? {
            ...destination,
            ...(draft && draft.destinationId === destination._id ? draft.values : {}),
        }
        : null;

    const update = (field: keyof Destination, value: string) => {
        if (!destination?._id) return;
        const destinationId = destination._id;

        setDraft((current) => ({
            destinationId,
            values: {
                ...(current?.destinationId === destinationId ? current.values : {}),
                [field]: field === "price" ? Number(value) : value,
            },
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        const {data} = await authClient.token();
        const token = data?.token

        event.preventDefault();

        if (!form?._id) {
            alert("Destination ID not found!");
            return;
        }

        try {
            setLoading(true);

            // Change this URL if your backend uses a different route.
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/destination/${form._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        destination: form.destination,
                        country: form.country,
                        category: form.category,
                        price: Number(form.price),
                        duration: form.duration,
                        departureDate: form.departureDate,
                        imageUrl: form.imageUrl,
                        description: form.description,
                    }),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to update destination");
            }

            toast.add({
                type: "success",
                title: "Package updated",
                description: "Package updated successfully!",
            });
            setOpen(false);

            router.refresh();

        } catch (error) {
            console.error("Update error:", error);
            toast.add({
                type: "error",
                title: "Update failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }

    };

    if (!form) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
                <Pencil />
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Update Travel Package</DialogTitle>
                    <DialogDescription>
                        Update the destination information below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="destination">Destination Name</Label>
                        <Input
                            id="destination"
                            placeholder="Bali Paradise"
                            value={form.destination}
                            onChange={(e) => update("destination", e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                placeholder="Indonesia"
                                value={form.country}
                                onChange={(e) => update("country", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={form.category}
                                onValueChange={(value) => update("category", value ?? "")}
                            >
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() +
                                                category.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                value={form.price}
                                onChange={(e) => update("price", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                placeholder="7 Days/6 Nights"
                                value={form.duration}
                                onChange={(e) => update("duration", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="departureDate">Departure Date</Label>
                        <Input
                            id="departureDate"
                            type="date"
                            value={form.departureDate}
                            onChange={(e) => update("departureDate", e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={form.imageUrl}
                            onChange={(e) => update("imageUrl", e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the travel experience..."
                            className="min-h-28"
                            value={form.description}
                            onChange={(e) => update("description", e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            <Trash2 />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
                        >
                            <PackageCheck />
                            {loading ? "Updating..." : "Update Package"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;