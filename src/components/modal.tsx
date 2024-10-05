"use client";

import { ReactNode } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { useEffect } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  // 처음엔 dialog태그가 화면에 보이지 않는 상태로 렌더링됨
  // -> useRef로 상태를 확인한 후 렌더링
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!dialogRef.current?.open) {
      // dialogRef가 열려있지 않다면 켜주기
      dialogRef.current?.showModal();
      // 스크롤은 상단으로 설정
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog className={style.modal} ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
