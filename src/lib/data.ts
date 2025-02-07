interface Component {
  title: string;
  description: string;
  href?: string;
  iconName: "Book" | "CirclesFour" | "Sidebar" | "MagnifyingGlass" | "Plus" | "DotsSixVertical" | "Target" | "Cards";
  comingSoon?: boolean;
}

export const components: Component[] = [
  {
    title: "Documentation",
    description: "Learn how to use Motion Components in your React applications.",
    iconName: "Book",
    href: "/docs",
  },
  {
    title: "Command Menu",
    description: "A command menu with smooth animations and elegant interactions. Perfect for actions, settings, or navigation menus.",
    iconName: "CirclesFour",
    href: "/components/command-menu",
  },
  {
    title: "Peekable Sidebar",
    description: "An elegant sidebar that expands on hover with smooth animations and tooltips. Perfect for navigation menus and dashboards.",
    iconName: "Sidebar",
    href: "/components/peekable-sidebar",
  },
  {
    title: "Morphing Search",
    description: "A search input that morphs from a compact icon to an expanded search field with smooth animations. Perfect for navigation bars and minimal interfaces.",
    iconName: "MagnifyingGlass",
    href: "/components/morphing-search",
  },
  {
    title: "Floating Action Button",
    description: "A dynamic + button that reveals multiple actions in an arc pattern",
    iconName: "Plus",
    comingSoon: true
  },
  {
    title: "Drag & Drop Navigation",
    description: "A customizable navigation bar with smooth drag and drop reordering",
    iconName: "DotsSixVertical",
    comingSoon: true
  },
  {
    title: "Spotlight Effect",
    description: "Create focus by dimming the background and highlighting specific elements",
    iconName: "Target",
    comingSoon: true
  },
  {
    title: "Drag-to-Reveal Panels",
    description: "Interactive panels with smooth drag-to-reveal functionality",
    iconName: "Cards",
    comingSoon: true
  }
]; 