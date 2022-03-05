import { SearchIcon } from "@heroicons/react/outline";
import { SortAscendingIcon } from "@heroicons/react/solid";

type Props = {
  placeholder?: string;
};

export const Search = (props: Props) => {
  return (
    <div>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            className="focus:ring-sky-500 focus:border-sky-500 block w-full rounded-none rounded-l-md pl-10 py-2.5 sm:text-sm border border-gray-300"
            placeholder={props.placeholder}
          />
        </div>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
        >
          <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Sort</span>
        </button>
      </div>
    </div>
  );
};
