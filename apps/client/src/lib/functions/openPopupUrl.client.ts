'use client';


export function openPopupUrl(url: string, title: string = "", width: number = 600, height: number = 600) {
  window.open(url, title, `popup,width=${width},height=${height}`);
}
