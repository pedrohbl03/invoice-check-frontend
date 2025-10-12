'use client';

import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

const CustomBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string): string => {
    
    if (/^[a-f0-9-]+$/i.test(segment)) {
      return segment;
    }

    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isLastSegment = (index: number) => index === segments.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {segments.length > 0 ? (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Home</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {segments.length > 0 && <BreadcrumbSeparator />}

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = isLastSegment(index);
          const formattedSegment = formatSegment(segment);

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{formattedSegment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;