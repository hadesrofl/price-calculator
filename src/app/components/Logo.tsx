import { CSSProperties } from "react";
import * as bookLogo from "../../../public/book.png";
import Image from "next/image";

interface CSSStyling {
  style?: CSSProperties;
}

/**
 * Create the logo for this application
 * @param {CSSStyling} props Are the properties for this logo, most of all the styling
 * @returns {JSX.Element} the logo as JSX.Element
 */
export default function Logo(props: CSSStyling) {
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
