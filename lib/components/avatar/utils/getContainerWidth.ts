const sizeMapInRem = {
  large: 2.75,
  medium: 2.25,
  small: 1.5,
};

export function getContainerWidth(
  size: "large" | "medium" | "small",
  count: number,
  offsetPercentage: number,
  remainingCount: number = 0,
) {
  const avatarSize = sizeMapInRem[size] || sizeMapInRem.medium;
  const totalAvatar = remainingCount > 0 ? count + 1 : count;
  if (totalAvatar <= 1) return `${avatarSize}rem`;
  const overlap = (offsetPercentage * avatarSize) / 100;
  const totalWidth = avatarSize + (totalAvatar - 1) * (avatarSize - overlap);
  return `${totalWidth}rem`;
}
