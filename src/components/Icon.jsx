import React from 'react';
import { 
  Shield, Lock, Eye, Globe, Plus, Copy, Download, Share, Settings, Sun, Moon, 
  Search, LayoutGrid, List, Filter, Home, FileText, Users, Code, ChevronDown, 
  MoreVertical, HelpCircle, Briefcase, User, Folder, FolderOpen,
  BarChart3
} from 'lucide-react';

const icons = {
  shield: Shield,
  lock: Lock,
  eye: Eye,
  globe: Globe,
  plus: Plus,
  copy: Copy,
  download: Download,
  share: Share,
  settings: Settings,
  sun: Sun,
  moon: Moon,
  search: Search,
  grid: LayoutGrid,
  'grid-3x3': LayoutGrid,
  list: List,
  filter: Filter,
  home: Home,
  file: FileText,
  'file-text': FileText,
  users: Users,
  code: Code,
  'chevron-down': ChevronDown,
  more: MoreVertical,
  'help-circle': HelpCircle,
  briefcase: Briefcase,
  user: User,
  folder: Folder,
  'folder-open': FolderOpen,
  'bar-chart-3': BarChart3,
};

const Icon = ({ name, strokeWidth = 1.5, ...props }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <LucideIcon strokeWidth={strokeWidth} {...props} />;
};

export default Icon;
