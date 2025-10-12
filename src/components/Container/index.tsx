import { cn } from "@/utils/cn";

const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("container mx-auto max-w-7xl", className)}>{children}</div>;
};

export default Container;