'use client';

import { openPopupUrl } from "@/lib/functions/openPopupUrl.client";

type LinkPopupProps = Readonly<{
  children: React.ReactNode;
  url: string;
}>

export function LinkPopup(props: LinkPopupProps) {
  return <button onClick={() => openPopupUrl(props.url)}>
    {props.children}
  </button>
}
