const JokeNew = () => (
  <div>
    <h1>New</h1>

    <form method="post">
      <div>
        <label>
          Name: <input type="text" name="name" />
        </label>
      </div>

      <div>
        <label>
          Content: <textarea name="content" />
        </label>
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
);

export default JokeNew;
