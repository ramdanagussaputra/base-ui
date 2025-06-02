interface SyleguideSubtitleProps {
  children: React.ReactNode;
}

function StyleguideSubtitle({ children }: Readonly<SyleguideSubtitleProps>) {
  return (
    <div className="text-primary-600 border-primary-600 rounded-full border p-0.5 text-center">
      <h3 className="text-h5-600">{children}</h3>
    </div>
  );
}

export default StyleguideSubtitle;
