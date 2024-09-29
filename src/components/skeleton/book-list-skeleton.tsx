import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0) // count개의 0으로 이루어진 배열을 생성 ex) count=2 -> [0,0]
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
  // 생성된 배열의 길이 만큼의 book item skeleton을 생성(배열의 값은 필요없고 idx만 사용)
}
