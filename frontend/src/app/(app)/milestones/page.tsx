"use client";

import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { useGoals } from "@/features/goals/goals.hooks";
import {
  useCreateMilestone,
  useDeleteMilestone,
  useMilestones,
  useUpdateMilestone,
} from "@/features/milestones/milestones.hooks";
import { MilestoneResponse } from "@/features/milestones/types";
import { getApiErrorMessage } from "@/lib/api-error";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormState {
  title: string;
  description: string;
  targetDate: string;
  weight: string;
  goalId: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  targetDate: "",
  weight: "1",
  goalId: "",
};

export default function MilestonesPage() {
  const { data: milestones, isLoading, isError } = useMilestones();
  const { data: goals } = useGoals();
  const createMilestone = useCreateMilestone();
  const updateMilestone = useUpdateMilestone();
  const deleteMilestone = useDeleteMilestone();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function startCreate() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, goalId: goals?.[0]?.id.toString() ?? "" });
    setShowForm(true);
  }

  function startEdit(milestone: MilestoneResponse) {
    setEditingId(milestone.id);
    setForm({
      title: milestone.title,
      description: milestone.description ?? "",
      targetDate: milestone.targetDate,
      weight: milestone.weight.toString(),
      goalId: milestone.goalId.toString(),
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMilestone.mutateAsync({
          id: editingId,
          request: {
            title: form.title,
            description: form.description || undefined,
            targetDate: form.targetDate,
            weight: Number(form.weight),
          },
        });
        toast.success("Milestone updated.");
      } else {
        if (!form.goalId) {
          toast.error("Create a goal first before adding milestones.");
          return;
        }
        await createMilestone.mutateAsync({
          title: form.title,
          description: form.description || undefined,
          targetDate: form.targetDate,
          weight: Number(form.weight),
          goalId: Number(form.goalId),
        });
        toast.success("Milestone created.");
      }
      closeForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteMilestone.mutateAsync(id);
      toast.success("Milestone deleted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  const isSaving = createMilestone.isPending || updateMilestone.isPending;

  function goalTitle(goalId: number) {
    return goals?.find((g) => g.id === goalId)?.title ?? `Goal #${goalId}`;
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Milestones</h1>
          {!showForm && (
            <Button onClick={startCreate}>
              <Plus className="h-4 w-4" />
              New Milestone
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingId ? "Edit Milestone" : "New Milestone"}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!editingId && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Goal</label>
                    <Select
                      required
                      value={form.goalId}
                      onChange={(e) =>
                        setForm({ ...form, goalId: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a goal
                      </option>
                      {goals?.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.title}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Date</label>
                    <Input
                      required
                      type="date"
                      value={form.targetDate}
                      onChange={(e) =>
                        setForm({ ...form, targetDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Weight (contribution to goal %)
                    </label>
                    <Input
                      required
                      type="number"
                      min={0}
                      value={form.weight}
                      onChange={(e) =>
                        setForm({ ...form, weight: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Create Milestone"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading milestones...
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            Couldn&apos;t load milestones.
          </p>
        )}

        <div className="space-y-3">
          {milestones?.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No milestones yet.
            </p>
          )}

          {milestones?.map((milestone) => (
            <Card key={milestone.id}>
              <CardContent className="flex items-start justify-between gap-4 py-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <Badge>{milestone.status}</Badge>
                    <Badge>Weight {milestone.weight}</Badge>
                  </div>
                  {milestone.description && (
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Goal: {goalTitle(milestone.goalId)} &middot; Target:{" "}
                    {milestone.targetDate} &middot; Progress:{" "}
                    {milestone.completionPercentage}%
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEdit(milestone)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(milestone.id)}
                    disabled={deleteMilestone.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
