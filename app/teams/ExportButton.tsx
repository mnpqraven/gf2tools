"use client";

import { toBlob, toPng } from "html-to-image";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtomValue } from "jotai";
import { Clipboard, Download } from "lucide-react";
import { cardRefAtom } from "./store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props extends Omit<ButtonProps, "onClick" | "children"> {
  mode: "DOWNLOAD" | "CLIPBOARD";
}

/**
 * @see https://github.com/mnpqraven/othi-monorepo/blob/main/apps/hsr/src/app/card/%5Buid%5D/_components/Exporter.tsx
 */
export function ExportButton({ className, mode, ...props }: Props) {
  const cardRef = useAtomValue(cardRefAtom);
  // we need a firefox check cause firefox can't directly copy image
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.indexOf("Firefox") > 0) setIsFirefox(true);
  }, []);

  function onExportClick() {
    exportImage(cardRef?.current, { mode })
      .then(() =>
        toast(
          mode === "DOWNLOAD" ? "Image exported" : "Image copied to clipboard",
        ),
      )
      .catch(() => toast("No character selected, please select a character"));
  }
  function label() {
    switch (mode) {
      case "DOWNLOAD":
        return "Download image";
      case "CLIPBOARD":
        return "Copy to clipboard";
    }
  }

  const disabled = !isFirefox ? false : mode === "CLIPBOARD";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          {...props}
          className={cn("px-2", className)}
          disabled={disabled}
          onClick={() => {
            onExportClick();
          }}
          variant="outline"
        >
          {mode === "DOWNLOAD" ? <Download /> : <Clipboard />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label()}</TooltipContent>
    </Tooltip>
  );
}

async function exportImage(
  element: HTMLDivElement | null | undefined,
  opt: { mode: "DOWNLOAD" | "CLIPBOARD" } = { mode: "DOWNLOAD" },
): Promise<void> {
  if (element) {
    if (opt.mode === "DOWNLOAD") {
      return toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "team-preset.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (opt.mode === "CLIPBOARD") {
      return toBlob(element).then((blob) => {
        if (blob) {
          const data = [new ClipboardItem({ [blob.type]: blob })];
          void navigator.clipboard.write(data);
        }
      });
    }
  } else return Promise.reject(Error("Empty image"));
}
