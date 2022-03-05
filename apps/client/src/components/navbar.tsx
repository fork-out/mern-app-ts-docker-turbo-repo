import { MenuAlt2Icon } from "@heroicons/react/outline";

export const Navbar: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow sm:hidden">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 md:hidden"
        onClick={() => onOpen()}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};
