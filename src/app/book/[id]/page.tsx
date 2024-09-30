import { notFound } from "next/navigation";
import style from "./page.module.css";

// 정적 파라미터로 생성한 페이지 이외에는 404 페이지로 이동
// export const dynamicParams = false;

// 정적인 파라미터를 생성하는 함수 <- 빌드 타임에 정적 파라미터를 읽어 헤당 파라미터에 해당하는 페이지를 정적으로 생성
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      // 접근할 수 없는 페이지인 경우 404페이지로 이동
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const book = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <BookDetail bookId={params.id} />
    </div>
  );
}
