'use client';

import { openPopupUrl } from "@/lib/functions/openPopupUrl.client";
import { useEffect } from "react";
import { Button } from "./ui/button";

type LinkPopupProps = Readonly<{
  children: React.ReactNode;
  title?: string;
  url: string;
}>

export function LinkPopup(props: LinkPopupProps) {
  return <Button className="cursor-pointer" onClick={() => openPopupUrl(props.url, props.title)}>
    {props.children}
  </Button>
}
