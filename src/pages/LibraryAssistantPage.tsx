import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { askAi } from "../api/client";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { aiRequestSchema, type AiRequestFormValues } from "../schemas/aiSchema";
import type { AiReply } from "../types";

const CATEGORY_LABELS: Record<AiReply["category"], string> = {
  "book-recommendation": "Book recommendation",
  "reservation-help": "Reservation help",
  "account-help": "Account help",
  "general-library-help": "General library help",
};

function LibraryAssistantPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiRequestFormValues>({
    resolver: zodResolver(aiRequestSchema),
    defaultValues: { prompt: "" },
  });

  const assistant = useMutation({ mutationFn: askAi });

  const onSubmit = (values: AiRequestFormValues): void => {
    assistant.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
        Library Assistant
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Ask for book discovery ideas, reservation guidance, or help using the library system.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            How can we help?
          </Label>
          <textarea
            id="prompt"
            rows={6}
            maxLength={2000}
            {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            aria-describedby={errors.prompt ? "prompt-error" : undefined}
            placeholder="Ask about finding a book or managing a reservation..."
            className="rounded-lg border border-input bg-background p-2.5 text-sm text-foreground"
          />
          {errors.prompt && (
            <p id="prompt-error" role="alert" className="text-sm text-red-600">
              {errors.prompt.message}
            </p>
          )}
          <p className="text-xs text-gray-500">Enter 20 to 2000 characters.</p>
        </div>

        <Button type="submit" disabled={assistant.isPending} className="justify-self-start">
          {assistant.isPending ? "Getting help..." : "Ask the library assistant"}
        </Button>
      </form>

      {assistant.isError && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {assistant.error.message}
        </p>
      )}

      {assistant.data && (
        <section
          aria-live="polite"
          className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
        >
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Category</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {CATEGORY_LABELS[assistant.data.category]}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Answer</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{assistant.data.answer}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Suggestions</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {assistant.data.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Next steps</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {assistant.data.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default LibraryAssistantPage;
