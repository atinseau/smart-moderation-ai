'use client';

import { ContentCard } from "@/components/Cards/ContentCard/ContentCard";
import { Pagination } from "@/components/Pagination/Pagination";
import { Content } from "@smart-moderation-ai/db"
import { useState } from "react";

type ContentsProps = {
  defaultData?: Content[]
}

const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

export function Contents(props: ContentsProps) {

  const [contents] = useState(props.defaultData || [])
  const [page, setPage] = useState(1);

  const contentsSliceStart = (page - 1) * ITEMS_PER_PAGE;
  const contentsSliceEnd = contentsSliceStart + ITEMS_PER_PAGE;
  const paginatedContents = contents.slice(contentsSliceStart, contentsSliceEnd);

  return <>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {paginatedContents.map((content) => <ContentCard
        key={content.id}
        content={content}
      />)}
    </div>
    <Pagination
      currentPage={page}
      onPageChange={setPage}
      itemsPerPage={ITEMS_PER_PAGE}
      totalItems={contents.length}
      maxVisiblePages={MAX_VISIBLE_PAGES}
    />
  </>
}
