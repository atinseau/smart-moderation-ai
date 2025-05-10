'use client';

import { openPopupUrl } from "@/lib/functions/openPopupUrl.client";
import { useEffect } from "react";

type LinkPopupProps = Readonly<{
  children: React.ReactNode;
  title?: string;
  url: string;
}>

export function LinkPopup(props: LinkPopupProps) {
  return <button onClick={() => openPopupUrl(props.url, props.title)}>
    {props.children}
  </button>
}
