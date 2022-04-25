import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name?: string;
    content?: string;
  };
  fields?: {
    name: string;
    content: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const validateJokeName = (name: string) => {
    if (name.length < 3) {
      return "That joke's name is too short";
    }
  };

  const validateJokeContent = (content: string) => {
    if (content.length < 10) {
      return "That joke is too short";
    }
  };

  const badRequest = (data: ActionData) => json(data, { status: 400 });

  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");

  if (typeof name !== "string" || typeof content !== "string") {
    return badRequest({
      formError: "Form not submitted correctly",
    });
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  const fields = { name, content };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
};

const JokeNew = () => {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <h1>Add </h1>

      <form method="post">
        <div>
          <label>
            {`Name: `}
            <input
              type="text"
              name="name"
              defaultValue={actionData?.fields?.name}
              aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
          </label>

          {actionData?.fieldErrors?.name && (
            <p className="form-validation-error" role="alert" id="name-error">
              {actionData.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label>
            {`Content: `}
            <textarea
              name="content"
              defaultValue={actionData?.fields?.content}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>

          {actionData?.fieldErrors?.content && (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          )}
        </div>

        <div>
          {actionData?.formError && (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          )}

          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default JokeNew;
