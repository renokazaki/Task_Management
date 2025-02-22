import { Category } from "@/types/category";
import { Dispatch, SetStateAction } from "react";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchema, { FormSchema as FormSchemaType } from "../schema";

type UsePostTaskProps = {
  selectCategory: Category;
  setIsAddTask: Dispatch<SetStateAction<boolean>>;
};
type UsePostTaskReturn = {
  onSubmit: (data: FormSchemaType) => Promise<void>;
  form: UseFormReturn<FormSchemaType>;
  isSubmitting: boolean;
};

export const usePostTask = ({
  selectCategory,
  setIsAddTask,
}: UsePostTaskProps): UsePostTaskReturn => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      emergency: "low",
      status: "pending",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const url = `/api/task/post?categoryId=${selectCategory.id}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
      } else {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("フォーム送信に失敗しました");
    }
    setIsAddTask((prev) => !prev);
  };

  return {
    onSubmit,
    form,
    isSubmitting,
  };
};
