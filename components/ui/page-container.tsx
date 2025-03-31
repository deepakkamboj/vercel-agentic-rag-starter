import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface PageContainerProps {
  title: string;
  breadcrumbs: { title: string; href: string }[];
  children: React.ReactNode;
  fixedHeight?: boolean;
}

export function PageContainer({
  title,
  breadcrumbs,
  children,
  fixedHeight = false,
}: PageContainerProps) {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Page Header */}
      <div className="sticky top-0 z-10 bg-background border-b shrink-0">
        <div className="container px-4 py-3 sm:px-6">
          <h1 className="text-xl font-bold">{title}</h1>

          {/* Breadcrumbs */}
          <Breadcrumb className="mt-1">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </div>
      </div>

      {/* Page Content */}
      <div
        className={`flex-1 p-4 sm:p-6 ${
          fixedHeight
            ? "h-[calc(100vh-8rem)] min-h-0 overflow-hidden"
            : "overflow-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
