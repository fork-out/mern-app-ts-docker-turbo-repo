import { classNames } from "../../../utils/classnames.utils";

const projects = [
  { name: "Data Team", initials: "DT", members: 2, progress: 90, bgColor: "bg-orange-600" },
  { name: "Engineering Team", initials: "ET", members: 3, progress: 45, bgColor: "bg-green-600" },
  {
    name: "Sustainability Team",
    initials: "ST",
    members: 4,
    progress: 24,
    bgColor: "bg-yellow-500"
  },
  { name: "Sales Team", initials: "ST", members: 2, progress: 60, bgColor: "bg-green-700" }
];

export const HeatMap = () => {
  return (
    <div>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Teams Overview</h2>
      <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map(project => (
          <li key={project.name} className="col-span-1 flex">
            <div className="flex-1 flex items-center justify-between truncate">
              <div className="flex-1 py-2 text-sm truncate">
                <span className=" font-medium ">
                  {project.name} <small className="text-gray-400">{project.progress}%</small>
                </span>
                <p className="text-gray-500 mb-2">{project.members} Members</p>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className={classNames("h-2 rounded-full")}
                    style={getProgress(project.progress)}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getProgress = (progress: number): { width: string; background: string } => {
  if (progress > 0 && progress < 25) {
    return { width: `${progress}%`, background: "#df5138" };
  } else if (progress > 25 && progress < 50) {
    return { width: `${progress}%`, background: "#ffa44a" };
  } else if (progress > 50 && progress < 75) {
    return { width: `${progress}%`, background: "#99cc66" };
  } else {
    return { width: `${progress}%`, background: "#47a346" };
  }
};
