import Link from "next/link";

interface IProp {
  path: string;
  text: string;
}

export function LinkButton({path, text}: IProp) {
  return (
    <Link href={path} className="inline-block border border-main text-center text-main font-bold rounded py-3 px-4 w-[150px]">
      {text}
    </Link>
  )
}