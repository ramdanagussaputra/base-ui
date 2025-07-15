const sizeMapInRem = {
  large: 2.75,
  medium: 2.25,
  small: 1.5,
};

type GetContainerWidthParams = {
  size: "large" | "medium" | "small";
  totalData: number;
  offsetPercentage: number;
  hiddenAvatarCount?: number;
};

export function getContainerWidth({
  size,
  totalData,
  offsetPercentage,
  hiddenAvatarCount = 0,
}: GetContainerWidthParams) {
  const displayCount = totalData - hiddenAvatarCount;
  const avatarSize = sizeMapInRem[size] || sizeMapInRem.medium;
  const totalAvatar = hiddenAvatarCount > 0 ? displayCount + 1 : displayCount;
  if (totalAvatar <= 1) return `${avatarSize}rem`;
  const overlap = (offsetPercentage * avatarSize) / 100;
  const totalWidth = avatarSize + (totalAvatar - 1) * (avatarSize - overlap);
  return `${totalWidth}rem`;
}
