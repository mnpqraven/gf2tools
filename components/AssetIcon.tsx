import Image from "next/image";
import { ComponentPropsWithRef } from "react";

export const ASSET_DICT = {
  CHAR_REPORT: "/items/char_report.png",
  WEP_REPORT: "/items/wep_report.png",
  CONDUCTOR_1: "/items/conductor_1.png",
  CONDUCTOR_2: "/items/conductor_2.png",
  CONDUCTOR_3: "/items/conductor_3.png",
  CONDUCTOR_4: "/items/conductor_4.png",
  CONDUCTOR_5: "/items/conductor_5.png",
  CONDUCTOR_6: "/items/conductor_6.png",
  STOCK_BAR_1: "/items/stock_bar_1.png",
  STOCK_BAR_2: "/items/stock_bar_2.png",
  STOCK_BAR_3: "/items/stock_bar_3.png",
  STOCK_BAR_4: "/items/stock_bar_4.png",
  STOCK_BAR_5: "/items/stock_bar_5.png",
  STOCK_BAR_6: "/items/stock_bar_6.png",
  KEY: "/items/key.png",
  MONEY: "/items/money.png",
  WEP_CLASS_HG: "/wepclass/hg.png",
  WEP_CLASS_SMG: "/wepclass/smg.png",
  WEP_CLASS_AR: "/wepclass/ar.png",
  WEP_CLASS_RF: "/wepclass/rf.png",
  WEP_CLASS_MG: "/wepclass/mg.png",
  WEP_CLASS_SG: "/wepclass/sg.png",
  WEP_CLASS_BLD: "/wepclass/bld.png",
  DOLL_CLASS_VANGUARD: "/dollclass/vanguard.png",
  DOLL_CLASS_BULWARK: "/dollclass/bulwark.png",
  DOLL_CLASS_SENTINEL: "/dollclass/sentinel.png",
  DOLL_CLASS_SUPPORT: "/dollclass/support.png",
};

export type AssetKey = keyof typeof ASSET_DICT;

interface Props
  extends Omit<ComponentPropsWithRef<typeof Image>, "src" | "alt"> {
  asset: AssetKey;
}
export function AssetIcon({
  asset: key,
  width = 48,
  height = 48,
  ...props
}: Props) {
  return (
    <Image
      {...props}
      alt={key}
      height={height}
      src={ASSET_DICT[key]}
      width={width}
    />
  );
}
