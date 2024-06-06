"use client";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = {
 href: string;
 animation: (onComplete: () => void) => void;
} & PropsWithChildren;

const TransitionLink = ({ href, children, animation }: Props) => {
 const router = useRouter();
 const pathname = usePathname();

 const handleClick = (e: any) => {
  e.preventDefault();
  if (pathname !== href)
   animation(() => {
    router.push(href as any);
   });
 };

 return (
  <a href={href} onClick={handleClick}>
   {children}
  </a>
 );
};

export default TransitionLink;
