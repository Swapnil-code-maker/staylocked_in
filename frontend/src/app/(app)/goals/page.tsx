"use client";

import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import {
  useCreateGoal,
  useDeleteGoal,
  useGoals,
  useUpdateGoal,
} from "@/features/goals/goals.hooks";
import {
  GOAL_CATEGORIES,
  GOAL_PRIORITIES,
  GoalCategory,
  GoalPriority,
  GoalResponse,
} from "@/features/goals/types";
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
  priority: GoalPriority;
  category: GoalCategory;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  targetDate: "",
  priority: "MEDIUM",
  category: "PERSONAL_GROWTH",
};

export default function GoalsPage() {
  const { data: goals, isLoading, isError } = useGoals();
  const createGoal = useCreateGoal();
  const updateGoal = useUpdateGoal();
  const deleteGoal = useDeleteGoal();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function startCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function startEdit(goal: GoalResponse) {
    setEditingId(goal.id);
    setForm({
      title: goal.title,
      description: goal.description ?? "",
      targetDate: goal.targetDate,
      priority: goal.priority,
      category: goal.category,
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

    const payload = {
      title: form.title,
      description: form.description || undefined,
      targetDate: form.targetDate,
      priority: form.priority,
      category: form.category,
    };

    try {
      if (editingId) {
        await updateGoal.mutateAsync({ id: editingId, request: payload });
        toast.success("Goal updated.");
      } else {
        await createGoal.mutateAsync(payload);
        toast.success("Goal created.");
      }
      closeForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteGoal.mutateAsync(id);
      toast.success("Goal deleted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  const isSaving = createGoal.isPending || updateGoal.isPending;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Goals</h1>
          {!showForm && (
            <Button onClick={startCreate}>
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingId ? "Edit Goal" : "New Goal"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={form.priority}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          priority: e.target.value as GoalPriority,
                        })
                      }
                    >
                      {GOAL_PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value as GoalCategory,
                        })
                      }
                    >
                      {GOAL_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Create Goal"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading goals...
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">Couldn&apos;t load goals.</p>
        )}

        <div className="space-y-3">
          {goals?.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No goals yet. Create your first one.
            </p>
          )}

          {goals?.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="flex items-start justify-between gap-4 py-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{goal.title}</h3>
                    <Badge>{goal.status}</Badge>
                    <Badge>{goal.priority}</Badge>
                    <Badge>{goal.category}</Badge>
                  </div>
                  {goal.description && (
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Target: {goal.targetDate} &middot; Progress:{" "}
                    {goal.completionPercentage}%
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEdit(goal)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(goal.id)}
                    disabled={deleteGoal.isPending}
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
