import React, { useState } from "react";

function Editor() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" />

      <label htmlFor="content">Content</label>
      <textarea id="content"></textarea>

      <label htmlFor="tags">Tags</label>
      <input id="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  );
}

export { Editor };
