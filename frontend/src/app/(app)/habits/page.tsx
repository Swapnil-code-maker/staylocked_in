"use client";

import { useState } from "react";
import { Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import {
  useCompleteHabit,
  useCreateHabit,
  useDeleteHabit,
  useHabits,
  useUpdateHabit,
} from "@/features/habits/habits.hooks";
import {
  HABIT_FREQUENCIES,
  HABIT_STATUSES,
  HabitFrequency,
  HabitResponse,
  HabitStatus,
} from "@/features/habits/types";
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
  frequency: HabitFrequency;
  status: HabitStatus;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  frequency: "DAILY",
  status: "ACTIVE",
};

export default function HabitsPage() {
  const { data: habits, isLoading, isError } = useHabits();
  const createHabit = useCreateHabit();
  const updateHabit = useUpdateHabit();
  const completeHabit = useCompleteHabit();
  const deleteHabit = useDeleteHabit();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function startCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function startEdit(habit: HabitResponse) {
    setEditingId(habit.id);
    setForm({
      title: habit.title,
      description: habit.description ?? "",
      frequency: habit.frequency,
      status: habit.status,
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
        await updateHabit.mutateAsync({
          id: editingId,
          request: {
            title: form.title,
            description: form.description || undefined,
            frequency: form.frequency,
            status: form.status,
          },
        });
        toast.success("Habit updated.");
      } else {
        await createHabit.mutateAsync({
          title: form.title,
          description: form.description || undefined,
          frequency: form.frequency,
        });
        toast.success("Habit created.");
      }
      closeForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleComplete(id: number) {
    try {
      await completeHabit.mutateAsync(id);
      toast.success("Nice work! Habit marked complete for today.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteHabit.mutateAsync(id);
      toast.success("Habit deleted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  const isSaving = createHabit.isPending || updateHabit.isPending;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Habits</h1>
          {!showForm && (
            <Button onClick={startCreate}>
              <Plus className="h-4 w-4" />
              New Habit
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingId ? "Edit Habit" : "New Habit"}</CardTitle>
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frequency</label>
                    <Select
                      value={form.frequency}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          frequency: e.target.value as HabitFrequency,
                        })
                      }
                    >
                      {HABIT_FREQUENCIES.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {editingId && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={form.status}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            status: e.target.value as HabitStatus,
                          })
                        }
                      >
                        {HABIT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Create Habit"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading habits...
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">Couldn&apos;t load habits.</p>
        )}

        <div className="space-y-3">
          {habits?.length === 0 && (
            <p className="text-sm text-muted-foreground">No habits yet.</p>
          )}

          {habits?.map((habit) => (
            <Card key={habit.id}>
              <CardContent className="flex items-start justify-between gap-4 py-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{habit.title}</h3>
                    <Badge>{habit.status}</Badge>
                    <Badge>{habit.frequency}</Badge>
                  </div>
                  {habit.description && (
                    <p className="text-sm text-muted-foreground">
                      {habit.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Current streak: {habit.currentStreak} &middot; Longest:{" "}
                    {habit.longestStreak}
                    {habit.lastCompletedDate && (
                      <> &middot; Last completed: {habit.lastCompletedDate}</>
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleComplete(habit.id)}
                    disabled={completeHabit.isPending}
                    title="Mark complete for today"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEdit(habit)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(habit.id)}
                    disabled={deleteHabit.isPending}
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
