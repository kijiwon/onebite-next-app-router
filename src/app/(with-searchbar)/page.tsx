import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";

// dynamic -> 특정 페이지의 유형을 강제로 static/dynamic 페이지로 결정
export const dynamic = "force-dynamic";
// 1. auto: 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 dynamic 페이지로 설정
// 3. force-static: 페이지를 강제로 static 페이지로 설정 <- 동적 힘수를 사용하는 페이지에 사용시 동적 함수가 undefined를 반환하도록 하기 때문에 기능이 제대로 동작하지 않을 수 있음
// 4. error: 페이지를 강제로 static 페이지로 설정. 단, 설정하면 안되는 이유(동적 함수, 캐싱되지 않는 데이터 패칭)가 있다면 빌드 오류를 발생시킴

async function AllBooks() {
  await delay(1500); // 1.5초 딜레이
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" } // 캐싱x
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecBooks() {
  await delay(3000); // 3초 딜레이
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 3초마다 최신화
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recBooks: BookData[] = await response.json();

  return (
    <div>
      {recBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        <Suspense
          fallback={
            <>
              <BookItemSkeleton />
              <BookItemSkeleton />
              <BookItemSkeleton />
            </>
          }
        >
          <RecBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense
          fallback={
            <>
              <BookItemSkeleton />
              <BookItemSkeleton />
              <BookItemSkeleton />
            </>
          }
        >
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
