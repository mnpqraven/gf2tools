import { useAtom } from "jotai";
import { CalcAtom } from "./SingularCalcBox";
import { ChangeEvent, useMemo, useState } from "react";
import { focusAtom } from "jotai-optics";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { DOLL_META } from "@/repository/dolls";
import Image from "next/image";

const defaultDollList = DOLL_META.reverse();

export function NameInput({ atom }: CalcAtom) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useNameAtom(atom);

  const [dolls, setDolls] = useState(defaultDollList);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    // early empty
    if (searchValue.length) {
      const Fuse = (await import("fuse.js")).default;
      const engine = new Fuse(defaultDollList, {
        keys: ["name"],
        threshold: 0.5,
      });
      const searchResult = engine.search(searchValue);

      setDolls(searchResult.map((e) => e.item));
    } else if (dolls.length !== defaultDollList.length)
      setDolls(defaultDollList);
  }

  function onDollSelect(name: string) {
    setName(name);
    setOpen(false);
    setDolls(defaultDollList);
  }

  // TODO: states for arrow navigation

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{name.length ? name : "Open"}</Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="flex w-auto flex-col gap-3">
        <Input defaultValue="" onChange={onChange} />

        <div className="grid grid-cols-7 gap-1">
          {dolls.map((doll) => (
            <Button
              key={doll.name}
              className="rounded-md border flex flex-col gap-1 items-center justify-center h-auto"
              onClick={() => onDollSelect(doll.name)}
              variant="outline"
            >
              {
                // TODO: placeholderimg
                doll.img.head ? (
                  <Image
                    src={doll.img.head}
                    alt={doll.name}
                    width={64}
                    height={64}
                  />
                ) : null
              }
              {doll.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function useNameAtom(atom: CalcAtom["atom"]) {
  const nameAtom = useMemo(
    () => focusAtom(atom, (optic) => optic.prop("name")),
    [atom]
  );

  nameAtom.debugLabel = `${atom.debugLabel}_name`;

  return useAtom(nameAtom);
}
