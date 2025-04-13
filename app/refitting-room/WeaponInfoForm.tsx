import { NumberInput } from "@/components/shared/NumberInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn, rarityVariants } from "@/lib/utils";
import type { WeaponSlugEnum } from "@/repository/enums";
import { maxWepRarity, minWepRarity } from "@/repository/wep";
import { useAtom, useAtomValue } from "jotai";
import { ChevronsLeft, ChevronsRight, CircleCheck } from "lucide-react";
import { motion } from "motion/react";
import { inCalcAtom } from "../calc/store";
import { AddToPlannerButton } from "./AddToPlannerButton";
import { wepLevelAtom, wepRankAtom, wepRarityAtom } from "./stores/wep";

interface Props {
  slug: WeaponSlugEnum;
}
export function WeaponInfoForm({ slug }: Props) {
  const [rank, setRank] = useAtom(wepRankAtom(slug));
  const [level = 1, setLevel] = useAtom(wepLevelAtom(slug));
  const [rarity = maxWepRarity(slug), setRarity] = useAtom(wepRarityAtom(slug));
  const inCalc = useAtomValue(inCalcAtom(slug));

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      layout="preserve-aspect">
      <Label htmlFor={`${slug}_level`}>Level</Label>
      <div className="flex items-center justify-center gap-2">
        <Button className="px-2" onClick={() => setLevel(1)} variant="outline">
          <ChevronsLeft />
        </Button>
        <NumberInput
          id={`${slug}_level`}
          max={60}
          min={1}
          onValueChange={(e) => setLevel(e)}
          value={level}
        />
        <Button className="px-2" onClick={() => setLevel(60)} variant="outline">
          <ChevronsRight />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${slug}_rank`}>Rank</Label>
          <NumberInput
            className={cn(
              "h-auto w-auto",
              rank === 6
                ? "font-semibold text-rarity-orange focus:text-rarity-orange"
                : "",
            )}
            id={`${slug}_rank`}
            max={6}
            min={1}
            onValueChange={setRank}
            value={rank}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${slug}_rarity`}>Rarity</Label>
          <NumberInput
            className={rarityVariants({
              className: "h-auto w-auto",
              text: rarity as 3 | 4 | 5,
            })}
            id={`${slug}_rarity`}
            max={maxWepRarity(slug)}
            min={minWepRarity(slug)}
            onValueChange={(e) => setRarity(e as 3 | 4 | 5)}
            value={rarity}
          />
        </div>
      </div>
      <AddToPlannerButton
        className="mt-2"
        currentLevel={level}
        slug={{ type: "WEP", slug }}
        variant={inCalc ? "success" : "default"}>
        {inCalc ? <CircleCheck /> : null}
        {inCalc ? "In planner" : "Add to planner"}
      </AddToPlannerButton>
    </motion.div>
  );
}
