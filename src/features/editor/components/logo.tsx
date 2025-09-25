import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/main">
      <div className="size-8 relative shrink-0 rounded-full">
        <Image
          src="/logo.png"
          fill
          alt="The Reelo"
          className="shrink-0 hover:opacity-75 transition object-contain rounded-full"
        />
      </div>
    </Link>
  );
};
