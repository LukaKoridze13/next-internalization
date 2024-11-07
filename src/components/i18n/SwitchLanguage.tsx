"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import GE from "@/assets/flags/ge.svg";
import EN from "@/assets/flags/gb.svg";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

interface Props {
  className?: string;
}

export default function SwitchLanguage({ className }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onLanguageChange() {
    if (!isPending) {
      const nextLocale = locale === "ka" ? "en" : "ka";

      startTransition(() => {
        router.replace(
          // @ts-expect-error
          { pathname, params },
          { locale: nextLocale }
        );
      });
    }
  }

  if (locale === "ka") {
    return <Image onClick={onLanguageChange} className={`w-10 cursor-pointer ${className}`} src={EN} alt="Flag of United Kingdom" />;
  } else {
    return <Image onClick={onLanguageChange} className={`w-10 cursor-pointer ${className}`} src={GE} alt="Flag of Georgia" />;
  }
}
