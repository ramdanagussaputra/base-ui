interface ItemContainerProps {
  children: React.ReactNode;
}

export default function ItemContainer({ children }: ItemContainerProps) {
  return <div className="flex flex-col gap-[0.75rem]">{children}</div>;
}
