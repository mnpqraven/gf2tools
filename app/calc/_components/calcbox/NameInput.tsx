import { atom, useAtom, useAtomValue } from "jotai";
import { CalcAtomProps } from "../../store";
import { ChangeEvent, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { DOLL_META, DollMeta } from "@/repository/dolls";
import Image from "next/image";
import { atomWithReset } from "jotai/utils";
import { type IFuseOptions } from "fuse.js";

type CommandState = {
  filteredDolls: typeof DOLL_META;
  popoverOpen: boolean;
  search: string;
};

const defaultDollList = DOLL_META.reverse();

const defaultCommandState: CommandState = {
  filteredDolls: defaultDollList,
  popoverOpen: false,
  search: "",
};

type Props = CalcAtomProps;

export function NameInput({ atom }: Props) {
  const { dollsAtom, openAtom, searchTextAtom } = useAtomGenerate();
  const [search, setSearch] = useAtom(searchTextAtom);
  const [open, setOpen] = useAtom(openAtom);
  const dolls = useAtomValue(dollsAtom);

  const [name, setName] = useNameAtom(atom);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    await setSearch(searchValue);
  }

  async function onDollSelect(name: string) {
    setName(name);
    await setOpen(false);
  }

  const allowCustomDoll = dolls.length < defaultDollList.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{name.length ? name : "Open"}</Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="flex w-auto flex-col gap-3">
        <Input value={search} onChange={onChange} />

        <div className="grid grid-cols-7 gap-1">
          {dolls.map(({ name, img }) => (
            <Button
              key={name}
              className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
              onClick={() => onDollSelect(name)}
              variant="outline"
            >
              {
                // TODO: placeholderimg
                img.head ? (
                  <Image src={img.head} alt={name} width={64} height={64} />
                ) : null
              }
              {name}
            </Button>
          ))}

          {allowCustomDoll ? (
            <Button
              className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
              onClick={() => onDollSelect(search)}
              variant="outline"
            >
              {`Custom: "${search}"`}
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function useAtomGenerate() {
  // TODO: states for arrow navigation
  // probably need fake indexing
  const parentAtom = useMemo(
    () => atomWithReset<CommandState>(defaultCommandState),
    [],
  );

  const dollsAtom = useMemo(
    () => focusAtom(parentAtom, (t) => t.prop("filteredDolls")),
    [parentAtom],
  );
  const searchTextAtom = useMemo(
    () =>
      atom(
        (get) => get(parentAtom).search,
        async (get, set, search: string) => {
          const filteredDolls = await searchDolls(search);
          const parent = get(parentAtom);
          set(parentAtom, { ...parent, search, filteredDolls });
        },
      ),
    [parentAtom],
  );

  const openAtom = useMemo(() => {
    const focus = focusAtom(parentAtom, (t) => t.prop("popoverOpen"));
    return atom(
      (get) => get(parentAtom).popoverOpen,
      async (_, set, next: boolean) => {
        set(focus, next);
        if (!next) {
          const resetDolls = () => set(dollsAtom, defaultDollList);
          setTimeout(resetDolls, 200);
        }
      },
    );
  }, [dollsAtom, parentAtom]);

  return { dollsAtom, openAtom, searchTextAtom };
}

function useNameAtom(atom: CalcAtomProps["atom"]) {
  const nameAtom = useMemo(
    () => focusAtom(atom, (t) => t.prop("name")),
    [atom],
  );

  return useAtom(nameAtom);
}

async function searchDolls(
  query: string,
  fuseOpt?: IFuseOptions<DollMeta> & {
    defaultPool: DollMeta[];
  },
): Promise<DollMeta[]> {
  const pool = fuseOpt?.defaultPool ?? defaultDollList;
  // early empty
  if (!query.length) return pool;

  const Fuse = (await import("fuse.js")).default;
  const engine = new Fuse(pool, {
    keys: ["name"],
    threshold: 0.5,
    ...fuseOpt,
  });
  const searchResult = engine.search(query);
  return searchResult.map((e) => e.item);
}
