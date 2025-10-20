export interface TabItem {
  id: string;
  icon: string;
  label: string;
}

export interface BottomBarProps {
  activeTab: string;
  onTabPress: (id: string) => void;
  tabs: TabItem[];
}

export enum BarVariant {
  Floating = 'floating',
  Sliding = 'sliding',
  Scale = 'scale',
  Morphing = 'morphing',
  Wave = 'wave',
}

