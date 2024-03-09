import { Button } from "@/components/ui/button";

export function ButtonDemo({ value, className }) {
  return <Button className={`${className}`}>{value}</Button>;
}
