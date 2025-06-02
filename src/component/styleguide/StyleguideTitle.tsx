interface StyleguideTitleProps {
  children: React.ReactNode;
}

function StyleguideTitle({ children }: Readonly<StyleguideTitleProps>) {
  return (
    <div className="bg-primary-600 flex items-center rounded-lg p-2">
      <h2 className="text-h2-600 text-neutral-0">{children}</h2>
    </div>
  );
}

export default StyleguideTitle;
