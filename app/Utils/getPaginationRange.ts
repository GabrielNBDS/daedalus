import { range } from './range'

const DOTS = 'dots'

export default function getPaginationRange(
  total: number,
  activePage: number,
  boundaries = 1,
  siblings = 1
) {
  const totalPageNumbers = siblings * 2 + 3 + boundaries * 2
  if (totalPageNumbers >= total) {
    return range(1, total)
  }

  const leftSiblingIndex = Math.max(activePage - siblings, boundaries)
  const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries)

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
  const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1)

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = siblings * 2 + boundaries + 2
    return [...range(1, leftItemCount), DOTS, ...range(total - (boundaries - 1), total)]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaries + 1 + 2 * siblings
    return [...range(1, boundaries), DOTS, ...range(total - rightItemCount, total)]
  }

  return [
    ...range(1, boundaries),
    DOTS,
    ...range(leftSiblingIndex, rightSiblingIndex),
    DOTS,
    ...range(total - boundaries + 1, total),
  ]
}
