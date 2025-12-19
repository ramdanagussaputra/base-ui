import {
  itemMask,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
} from "../assets";

export function DiscoverBackground() {
  const items = [item1, item2, item3, item4, item5, item6, item7];

  return (
    <div
      className="pointer-events-none absolute top-1/2 right-0 h-[422.36px] w-[461.71px] -translate-y-1/2 overflow-hidden"
      style={{
        maskImage: `url(${itemMask})`,
        WebkitMaskImage: `url(${itemMask})`,
        maskSize: "460px 359px",
        WebkitMaskSize: "460px 359px",
        maskPosition: "1.875px 32px",
        WebkitMaskPosition: "1.875px 32px",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col">
        {items.map((src, index) => (
          <div
            key={index}
            className="relative mb-[-1px] h-[58.73px] w-[465px] shrink-0"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
