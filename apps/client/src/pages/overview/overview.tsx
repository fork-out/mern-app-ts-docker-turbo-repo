import { HeatMap } from "./components/heat-map";
import { MembersList } from "./components/members-list";

export const Overview = () => {
  return (
    <main className="flex-1">
      <div className="py-8">
        <div className="mx-auto px-4 sm:px-6 md:px-8 pb-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">Overview</h3>
        </div>
        <div className="mx-auto p-4 sm:px-6 md:px-8">
          <HeatMap />

          <div className="mt-8" />
          <MembersList />
        </div>
      </div>
    </main>
  );
};
