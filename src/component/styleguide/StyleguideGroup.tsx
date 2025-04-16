interface StyleguideGroupProps {
  children: React.ReactNode;
}

function StyleguideGroup({ children }: Readonly<StyleguideGroupProps>) {
  return <div className="space-y-7">{children}</div>;
}

export default StyleguideGroup;
