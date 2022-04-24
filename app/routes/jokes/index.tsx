import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

type LoaderData = {
  randomJoke: {
    id: string;
    name: string;
    content: string;
  };
};

export const loader: LoaderFunction = async () => {
  const jokesCount = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * jokesCount);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  const data: LoaderData = { randomJoke };

  return json(data);
};

const Jokes = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random joke:</p>

      <p>{data.randomJoke.content}</p>

      <Link to={data.randomJoke.id}>"{data.randomJoke.name}" Permalink</Link>
    </div>
  );
};

export default Jokes;
