import NavigationCard from "@/ui/NavigationCard";
import { NAVIGATION } from "@/constants/navigation";

export default function Page() {
  return (
    <div className="relative text-[var(--color-text-primary)]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold leading-tight mb-4">
          EVM Utils
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          Simple, powerful tools for Ethereum developers.
        </p>
      </div>

      <div
        id="tools"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {NAVIGATION.map((nav) => (
          <NavigationCard
            key={nav.name}
            nav={{
              ...nav,
              Icon: <nav.Icon size={26} />,
            }}
          />
        ))}
      </div>
    </div>
  );
}
