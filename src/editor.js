import React, { useState } from "react";

import { savePost } from "./api";

function Editor() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const { title, content, tags } = e.target.elements;

    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(",").map((t) => t.trim()),
    }).catch((response) => {
      setIsSaving(false);
      setError(response.data.error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" />

      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" />

      <label htmlFor="tags">Tags</label>
      <input id="tags" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
      {error && <div role="alert">{error}</div>}
    </form>
  );
}

export { Editor };
