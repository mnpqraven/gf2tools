import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { maxWepRarity, minWepRarity } from "@/repository/wep";
import { NumberInput } from "@/components/shared/NumberInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { wepLevelAtom, wepRankAtom, wepRarityAtom } from "./stores/wep";
import { WeaponSlugEnum } from "@/repository/enums";
import { useAtom } from "jotai";
import { weaponRarityVariants } from "@/lib/utils";
import { motion } from "motion/react";
import { AddToPlannerButton } from "./AddToPlannerButton";

interface Props {
  slug: WeaponSlugEnum;
}
export function WeaponInfoForm({ slug }: Props) {
  const [rank, setRank] = useAtom(wepRankAtom(slug));
  const [level = 1, setLevel] = useAtom(wepLevelAtom(slug));
  const [rarity = maxWepRarity(slug), setRarity] = useAtom(wepRarityAtom(slug));

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      layout="preserve-aspect"
    >
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
            className="h-auto w-auto"
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
            className={weaponRarityVariants({
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
      <AddToPlannerButton className="mt-2" slug={{ type: "WEP", slug }}>
        Add to planner
      </AddToPlannerButton>
    </motion.div>
  );
}
