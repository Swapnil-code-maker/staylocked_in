"use client";

import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { useMilestones } from "@/features/milestones/milestones.hooks";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
  useUpdateTaskStatus,
} from "@/features/tasks/tasks.hooks";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskPriority,
  TaskResponse,
  TaskStatus,
} from "@/features/tasks/types";
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
  priority: TaskPriority;
  dueDate: string;
  estimatedMinutes: string;
  milestoneId: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  priority: "MEDIUM",
  dueDate: "",
  estimatedMinutes: "",
  milestoneId: "",
};

export default function TasksPage() {
  const { data: tasks, isLoading, isError } = useTasks();
  const { data: milestones } = useMilestones();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function startCreate() {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      milestoneId: milestones?.[0]?.id.toString() ?? "",
    });
    setShowForm(true);
  }

  function startEdit(task: TaskResponse) {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      dueDate: task.dueDate ?? "",
      estimatedMinutes: task.estimatedMinutes?.toString() ?? "",
      milestoneId: task.milestoneId.toString(),
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
        await updateTask.mutateAsync({
          id: editingId,
          request: {
            title: form.title,
            description: form.description || undefined,
            priority: form.priority,
            dueDate: form.dueDate || undefined,
            estimatedMinutes: form.estimatedMinutes
              ? Number(form.estimatedMinutes)
              : undefined,
          },
        });
        toast.success("Task updated.");
      } else {
        if (!form.milestoneId) {
          toast.error("Create a milestone first before adding tasks.");
          return;
        }
        await createTask.mutateAsync({
          title: form.title,
          description: form.description || undefined,
          priority: form.priority,
          dueDate: form.dueDate || undefined,
          estimatedMinutes: form.estimatedMinutes
            ? Number(form.estimatedMinutes)
            : undefined,
          milestoneId: Number(form.milestoneId),
        });
        toast.success("Task created.");
      }
      closeForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask.mutateAsync(id);
      toast.success("Task deleted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleStatusChange(id: number, status: TaskStatus) {
    try {
      await updateStatus.mutateAsync({ id, status });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  const isSaving = createTask.isPending || updateTask.isPending;

  function milestoneTitle(milestoneId: number) {
    return (
      milestones?.find((m) => m.id === milestoneId)?.title ??
      `Milestone #${milestoneId}`
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Tasks</h1>
          {!showForm && (
            <Button onClick={startCreate}>
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingId ? "Edit Task" : "New Task"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!editingId && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Milestone</label>
                    <Select
                      required
                      value={form.milestoneId}
                      onChange={(e) =>
                        setForm({ ...form, milestoneId: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a milestone
                      </option>
                      {milestones?.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title}
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={form.priority}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          priority: e.target.value as TaskPriority,
                        })
                      }
                    >
                      {TASK_PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <Input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) =>
                        setForm({ ...form, dueDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Estimated Minutes
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={form.estimatedMinutes}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          estimatedMinutes: e.target.value,
                        })
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
                    "Create Task"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading tasks...
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">Couldn&apos;t load tasks.</p>
        )}

        <div className="space-y-3">
          {tasks?.length === 0 && (
            <p className="text-sm text-muted-foreground">No tasks yet.</p>
          )}

          {tasks?.map((task) => (
            <Card key={task.id}>
              <CardContent className="flex items-start justify-between gap-4 py-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge>{task.priority}</Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Milestone: {milestoneTitle(task.milestoneId)}
                    {task.dueDate && <> &middot; Due: {task.dueDate}</>}
                    {task.estimatedMinutes && (
                      <> &middot; {task.estimatedMinutes} min</>
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task.id,
                        e.target.value as TaskStatus
                      )
                    }
                    className="w-auto"
                  >
                    {TASK_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => startEdit(task)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(task.id)}
                    disabled={deleteTask.isPending}
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
