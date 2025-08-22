import React from "react";
import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({ questionSet }: { questionSet: IAttempQuestionForm }) {
  // ✅ Ensure questions array exists
  const defaultValues: IAttempQuestionForm = {
    ...questionSet,
    questions: questionSet.questions || [],
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;

  console.log("form values => ", watch());

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses:
        data?.questions?.map((question) => ({
          questionId: question?._id,
          selectedChoicesIds:
            question?.choices
              ?.filter((choice) => choice?.selected)
              ?.map((ch) => ch?._id) || [],
        })) || [],
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("Answer Set Updated Successfully ✅");
      })
      .catch((err) => {
        console.error("Error submitting answers:", err);
        alert("❌ Failed to submit answers");
      });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label>Enter Title</label>
            <input {...register("title")} placeholder="Enter Title" />
          </div>
          <CreateQuestions />
          <button type="submit" style={{ marginTop: "1rem" }}>
            Submit Answer
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  if (!fields.length) {
    return <p>No questions available </p>;
  }

  return (
    <div>
      <h2>Questions</h2>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: "1rem" }}>
          <p>{field?.questionText}</p>
          <CreateChoices questionIndex={index} />
        </div>
      ))}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  if (!fields.length) {
    return <p style={{ marginLeft: "1rem" }}>No choices available ❌</p>;
  }

  return (
    <div style={{ marginLeft: "1rem" }}>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <input
            type="checkbox"
            {...register(`questions.${questionIndex}.choices.${index}.selected`)}
          />
          <p>{field?.text}</p>
        </div>
      ))}
    </div>
  );
}

export default AttemptQuizForm;
