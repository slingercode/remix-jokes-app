import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

type LoaderData = {
  joke: {
    id: string;
    name: string;
    content: string;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  if (!joke) throw new Error("Joke not found");

  const data: LoaderData = { joke };

  return json(data);
};

const Joke = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>

      <p>{data.joke.content}</p>

      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
};

export default Joke;
