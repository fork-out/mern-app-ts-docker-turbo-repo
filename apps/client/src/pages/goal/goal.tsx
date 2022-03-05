import { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/solid";

import { CustomMenu } from "../../components/dropdown";
import { EmptyState } from "../../components/empty-state";
import { Search } from "../../components/search";
import { KeyResultsIcon, ObjectiveIcon } from "../../icons";

import { GoalDetails } from "./components/goal-details";
import { OKRTable } from "./components/okr-table";

export const Goal = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <main className="flex-1">
      <div className="py-3">
        <div className="mx-auto px-4 sm:px-6 md:px-8 pb-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">OKRs</h3>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <CustomMenu
              label={
                <span className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                  Create
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-sky-200 hover:text-sky-100"
                    aria-hidden="true"
                  />
                </span>
              }
              items={[
                {
                  key: "objective",
                  label: "Objective",
                  icon: <ObjectiveIcon />
                },
                {
                  key: "key-result",
                  label: "Key Result",
                  icon: <KeyResultsIcon />
                }
              ]}
            />
          </div>
        </div>
        <div className="mx-auto p-4 sm:px-6 md:px-8">
          <Search placeholder="Search objectives &amp; key results..." />

          {/* Replace with your content */}
          <div className="py-4">
            {data.length > 0 ? (
              <OKRTable onGoalSelected={goal => setSelectedGoal(goal)} />
            ) : (
              <div className="grid place-content-center border-2 border-dashed border-gray-200 rounded-lg h-96">
                <EmptyState />
              </div>
            )}
          </div>
          {/* /End replace */}
          <GoalDetails open={!!selectedGoal} onClose={() => setSelectedGoal("")} />
        </div>
      </div>
    </main>
  );
};
