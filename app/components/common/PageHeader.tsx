import {Heading, Skeleton} from "@radix-ui/themes";
import {ReactElement} from "react";

export default function PageHeader({title, children}: {title?: string, children?: ReactElement}) {
  return <div>
    <div className="flex justify-between mb-4">
      <Skeleton loading={!title} width="150px" height="32px">
        <Heading>{title}</Heading>
      </Skeleton>
      <div>{children}</div>
    </div>
  </div>

}