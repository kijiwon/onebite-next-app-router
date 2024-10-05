"use server";

import { revalidateTag } from "next/cache";

// server action을 할 함수
export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // useActionState의 state로 전송할 반환값 설정
  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }), // 직렬화
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // revalidatePath(`/book/${bookId}`);
    // 태그를 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    // useActionState의 state로 전송할 반환값 설정
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    // useActionState의 state로 전송할 반환값 설정
    return {
      status: false,
      error: `리뷰 저장에 실패앴습니다 : ${error}`,
    };
  }
}
