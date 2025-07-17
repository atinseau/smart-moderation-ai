'use client';

import { ContentCard } from "@/components/Cards/ContentCard/ContentCard";
import { Pagination } from "@/components/Pagination/Pagination";
import { api } from "@/lib/instances/api";
import { Content, Prisma } from "@smart-moderation-ai/db"
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import isEqual from "lodash/isEqual";
import { useContentsStore } from "@/stores/contents";

type ContentsProps = {
  defaultData?: Prisma.ContentGetPayload<{
    include: { moderation: true }
  }>[]
}

const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

export function Contents(props: ContentsProps) {

  const [contents, setContents] = useState(props.defaultData || [])
  const [page, setPage] = useState(1);

  const isSelectionMode = useContentsStore((state) => state.isSelectionMode);
  const setSelectedIds = useContentsStore((state) => state.setSelectedIds);
  const selectedIds = useContentsStore((state) => state.selectedIds);

  const handleDelete = async (content: Content) => {
    try {
      const { error } = await api.contents({ id: content.id }).delete()
      if (error) {
        throw new Error(error?.value?.message || "Failed to delete content");
      }

    } catch (error) {
      toast.error((error as Error).message, {
        richColors: true,
        position: "top-right"
      });
    }
  }

  const handleSelect = (id: string) => {
    if (isSelectionMode) {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    }
  }

  const filteredContents = useMemo(() => {
    if (isSelectionMode) {
      return contents.filter((content) => !content.moderation)
    }
    return contents;
  }, [contents, isSelectionMode])

  const paginatedContents = useMemo(() => {
    const contentsSliceStart = (page - 1) * ITEMS_PER_PAGE;
    const contentsSliceEnd = contentsSliceStart + ITEMS_PER_PAGE;
    const paginatedContents = filteredContents.slice(contentsSliceStart, contentsSliceEnd);

    return paginatedContents
  }, [page, filteredContents])

  // Sync contents state when defaultData changes
  useEffect(() => {
    // If there is a diff between the current contents and the new defaultData, update the contents state
    const defaultDataIds = props.defaultData?.map(content => content.id) || [];
    const currentContentsIds = contents.map(content => content.id);

    if (isEqual(defaultDataIds, currentContentsIds)) {
      return
    }

    setContents(props.defaultData || []);
    setPage(1); // Reset to first page when defaultData changes
  }, [props.defaultData])

  return <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedContents.map((content) => <ContentCard
        isModerated={!!content?.moderation}
        key={content.id}
        content={content}
        selectionMode={isSelectionMode}
        onSelect={handleSelect}
        isSelected={selectedIds.includes(content.id)}
        onDelete={handleDelete}
      />)}
    </div>
    <Pagination
      currentPage={page}
      onPageChange={setPage}
      itemsPerPage={ITEMS_PER_PAGE}
      totalItems={filteredContents.length}
      maxVisiblePages={MAX_VISIBLE_PAGES}
    />
  </>
}
