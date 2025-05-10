import { SetStateAction } from "react";

interface CheckBoxProps {
  text: string;
  isChecked: boolean;
  setIsChecked: (value: SetStateAction<boolean>) => void;
}

export default function CheckBox({
  text,
  isChecked,
  setIsChecked,
}: CheckBoxProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        className="accent-[var(--color-bg)]"
      />
      {text}
    </label>
  );
}
