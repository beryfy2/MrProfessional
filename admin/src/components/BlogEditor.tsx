interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function BlogEditor({ value, onChange }: Props) {
  return (
    <div className="blog-editor">
      <label>Blog Content</label>

      <textarea
        rows={14}
        placeholder="Write blog content here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
