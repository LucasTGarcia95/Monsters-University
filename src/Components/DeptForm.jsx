import { useState } from "react";

export function DeptForm({ initial = {}, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    description: initial.description || "",
    banner_image_url: initial.banner_image_url || "",
    contact_info: initial.contact_info || "",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <label className="label">Department name</label>
      <input
        className="input"
        value={form.name}
        onChange={set("name")}
        required
      />
      <label className="label">Description</label>
      <textarea
        className="input textarea"
        value={form.description}
        onChange={set("description")}
        rows={4}
        required
      />
      <label className="label">Banner image URL</label>
      <input
        className="input"
        value={form.banner_image_url}
        onChange={set("banner_image_url")}
        placeholder="https://…"
      />
      <label className="label">Contact info</label>
      <input
        className="input"
        value={form.contact_info}
        onChange={set("contact_info")}
        placeholder="e.g. room 101, ext. 2345"
      />
      <div className="form-row">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Saving…" : "Save department"}
        </button>
      </div>
    </form>
  );
}
