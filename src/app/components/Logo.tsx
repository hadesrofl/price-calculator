import { CSSProperties } from "react";
import * as bookLogo from "../../../public/book.png";
import Image from "next/image";

export default function Logo(props: { style?: CSSProperties }) {
  const { style } = props;
  return (
    <Image
      width={48}
      src={bookLogo}
      alt="Book with a dollar sign on the edge"
      style={style}
    />
  );
}
