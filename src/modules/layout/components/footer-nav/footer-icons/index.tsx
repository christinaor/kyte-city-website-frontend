import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterIcons: React.FC = () => {
  const pathname = usePathname();

  const useLightPath = (
    pathname.startsWith("/search")
    || pathname === "/product" 
    || pathname === "/"
  ) 
  ? "-light"
  : ""
  console.log(useLightPath)
  
  return (
    <div className="flex gap-4">
      <Link href="https://www.linkedin.com">
        <Image 
          src={`/icons/social-media/linkedin${useLightPath}.svg`}
          alt="linkedin icon"
          width="16"
          height="16"
        />
      </Link>

      <Link href="https://www.instagram.com">
        <Image 
          src={`/icons/social-media/instagram${useLightPath}.svg`}
          alt="instagram icon"
          width="16"
          height="16"
        />
      </Link>

      <Link href="https://www.facebook.com">
        <Image 
          src={`/icons/social-media/facebook${useLightPath}.svg`}
          alt="facebook icon"
          width="16"
          height="16"
        />
      </Link>

      <Link href="https://www.youtube.com">
        <Image 
          src={`/icons/social-media/youtube${useLightPath}.svg`}
          alt="youtube icon"
          width="16"
          height="16"
        />
      </Link>

      <Link href="https://www.twitter.com">
        <Image 
          src={`/icons/social-media/twitter${useLightPath}.svg`}
          alt="twitter icon"
          width="16"
          height="16"
        />
      </Link>
    </div>
  );
};

export default FooterIcons;