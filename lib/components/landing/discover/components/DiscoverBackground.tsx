import { item1, item2, item3, item4, item5, item6, item7 } from "../assets";

export function DiscoverBackground() {
  const items = [item1, item2, item3, item4, item5, item6, item7];

  return (
    <div
      className="pointer-events-none absolute top-1/2 right-0 h-[26.4rem] w-[28.86rem] -translate-y-1/2 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(70% 70% at 50% 40%, black 20%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(70% 70% at 50% 40%, black 20%, transparent 100%)",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col">
        {items.map((src, index) => (
          <div
            key={index}
            className="relative mb-[-0.0625rem] h-[3.67rem] w-[29.06rem] shrink-0"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
