"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// server action을 할 함수
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }), // 직렬화
      }
    );

    console.log(response.status);
    // revalidatePath(`/book/${bookId}`);
    // 태그를 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
  } catch (error) {
    console.log(error);
    return;
  }
}
