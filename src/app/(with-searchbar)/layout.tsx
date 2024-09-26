import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Searchbar <- 사전 렌더링 과정에서 배제하기(build 오류) */}
      {/* 클라이언트 사이드에서 쿼리 스트링을 불러 왔을 때(브라우저에 마운트 되었을 때 searchBar의 비동기 작업이 완료됨)  */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
