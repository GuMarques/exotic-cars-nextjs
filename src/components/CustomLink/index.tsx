import { FC } from "react";
import { CustomLink as Link } from "./styles";
import { LinkProps } from "next/link";

const CustomLink: FC<LinkProps> = (props) => {
  return <Link {...props}>{props.children}</Link>;
};

export default CustomLink;
