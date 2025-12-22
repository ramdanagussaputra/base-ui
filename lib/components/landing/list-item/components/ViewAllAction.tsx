interface ViewAllActionProps {
  onClick: () => void;
  text?: string;
}

export default function ViewAllAction({
  onClick,
  text = "SEE ALL",
}: ViewAllActionProps) {
  return (
    <button
      className="text-b3-600 text-primary-600 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
