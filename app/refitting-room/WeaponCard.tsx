"use client";

import { AssetIcon } from "@/components/AssetIcon";
import { Toggle } from "@/components/ui/toggle";
import { WeaponSlugEnum } from "@/repository/enums";
import { useAtomValue, useSetAtom } from "jotai";
import {
  toggleWepOwnershipAtom,
  wepOwnedAtom,
  wepRarityAtom,
} from "./stores/wep";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { maxWepRarity, WEP_SLUGS_MAP, wepImgSrc } from "@/repository/wep";
import Image from "next/image";
import { WeaponInfoForm } from "./WeaponInfoForm";
import { cn, weaponRarityVariants } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  slug: WeaponSlugEnum;
}
export function WeaponCard({ slug }: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const owned = useAtomValue(wepOwnedAtom(slug));
  const toggleOwnership = useSetAtom(toggleWepOwnershipAtom(slug));
  const rarity = useAtomValue(wepRarityAtom(slug)) ?? maxWepRarity(slug);

  function onOwnedToggle(to: boolean) {
    setDetailOpen(to);
    toggleOwnership();
  }
  return (
    <motion.div
      className={cn(
        "flex flex-col gap-1 rounded-md border p-2",
        detailOpen ? "row-span-2" : "",
      )}
      key={slug}
      style={{ borderRadius: 6 }}
    >
      <motion.div className="flex items-center gap-1" layout="position">
        <Image
          alt="wep"
          className={weaponRarityVariants({
            className: "rounded-md border",
            border: rarity,
          })}
          height={64}
          src={wepImgSrc(slug, rarity)}
          width={64}
        />
        <span>{WEP_SLUGS_MAP[slug].name}</span>
        <AssetIcon
          asset="WEP_CLASS_AR"
          className="ml-auto h-6 w-6 rounded-full bg-primary dark:bg-transparent"
        />
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-1" layout="position">
        <Toggle
          onPressedChange={onOwnedToggle}
          pressed={owned}
          variant="outline"
        >
          Owned
        </Toggle>
        <Toggle
          disabled={!owned}
          onPressedChange={setDetailOpen}
          pressed={detailOpen}
          variant="outline"
        >
          <ChevronsUpDown />
        </Toggle>
      </motion.div>

      {detailOpen ? <WeaponInfoForm slug={slug} /> : null}
    </motion.div>
  );
}
