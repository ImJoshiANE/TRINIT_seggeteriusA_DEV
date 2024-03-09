import { Button } from "@/components/ui/Button";

export function ButtonDemo({ value, className }) {
  return <Button className={`${className}`}>{value}</Button>;
}
