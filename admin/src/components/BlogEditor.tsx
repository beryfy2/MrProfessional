interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function BlogEditor({ value, onChange }: Props) {
  return (
    <textarea
      rows={10}
      placeholder="Write blog content here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
