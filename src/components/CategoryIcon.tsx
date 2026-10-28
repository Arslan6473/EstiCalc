import {
  BrickWall,
  Blocks,
  CircleDollarSign,
  Droplets,
  Grid3x3,
  House,
  Layers,
  Leaf,
  PaintRoller,
  Ruler,
  Thermometer,
  type LucideProps,
} from "lucide-react";

const icons = {
  ruler: Ruler,
  paint: PaintRoller,
  floor: Layers,
  tile: Grid3x3,
  wall: BrickWall,
  brick: Blocks,
  leaf: Leaf,
  home: House,
  sun: Thermometer,
  dollar: CircleDollarSign,
  water: Droplets,
};

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? Ruler;
  return <Icon aria-hidden="true" {...props} />;
}
