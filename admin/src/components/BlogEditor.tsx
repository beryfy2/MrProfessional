interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function BlogEditor({ value, onChange }: Props) {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const charCount = value.length;

  return (
    <div className="blog-editor">
      <div className="blog-editor-header">
        <label>Blog Content</label>
        <div className="editor-stats">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
      </div>
      <textarea
        rows={16}
        placeholder="Write your blog content here... You can use markdown formatting for better structure."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="blog-textarea"
      />
      <div className="editor-hint">
        💡 Tip: Use line breaks and paragraphs to structure your content better.
      </div>
    </div>
  );
}
