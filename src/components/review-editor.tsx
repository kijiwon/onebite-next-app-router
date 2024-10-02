"use client";

import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );
  return (
    <section>
      <form className={style.form_container} action={formAction}>
        {/* bookId를 넘겨주기 위한 input */}
        <input name="bookId" value={bookId} hidden />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
