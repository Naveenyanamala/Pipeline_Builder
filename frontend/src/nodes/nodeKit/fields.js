import React from "react";

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="vs-field">
      <span className="vs-fieldLabel">{label}</span>
      <input
        className="vs-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <label className="vs-field">
      <span className="vs-fieldLabel">{label}</span>
      <select
        className="vs-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextAreaField({ label, value, onChange, placeholder, inputRef }) {
  return (
    <label className="vs-field vs-fieldTextarea">
      <span className="vs-fieldLabel">{label}</span>
      <textarea
        ref={inputRef}
        className="vs-textarea nodrag"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
      />
    </label>
  );
}

