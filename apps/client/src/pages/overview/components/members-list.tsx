import { classNames } from "../../../utils/classnames.utils";

type Person = {
  id: number;
  name: string;
  role: string;
  progress: number;
  imageUrl: string;
};

const directory: { [key: string]: Person[] } = {
  Engineering: [
    {
      id: 1,
      progress: 15,
      name: "Leslie Abbott",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Hector Adams",
      role: "VP, Marketing",
      progress: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Blake Alexander",
      role: "Account Coordinator",
      progress: 70,
      imageUrl:
        "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Fabricio Andrews",
      role: "Senior Art Director",
      progress: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ],
  Sales: [
    {
      id: 5,
      name: "Angela Beaver",
      role: "Chief Strategy Officer",
      progress: 100,

      imageUrl:
        "https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 6,
      name: "Yvette Blanchard",
      role: "Studio Artist",
      progress: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 7,
      name: "Lawrence Brooks",
      role: "Content Specialist",

      progress: 80,

      imageUrl:
        "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ],
  Data: [
    {
      id: 8,
      name: "Jeffrey Clark",
      role: "Senior Art Director",
      progress: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 9,
      name: "Kathryn Cooper",
      role: "Associate Creative Director",
      progress: 100,

      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ],
  Sustainability: [
    {
      id: 10,
      name: "Alicia Edwards",
      role: "Junior Copywriter",
      progress: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 11,
      name: "Benjamin Emerson",
      role: "Director, Print Operations",
      progress: 20,

      imageUrl:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 12,
      name: "Jillian Erics",
      role: "Designer",
      progress: 20,

      imageUrl:
        "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 13,
      name: "Chelsea Evans",
      role: "Human Resources Manager",
      progress: 20,
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};

export const MembersList = () => {
  return (
    <nav className="h-full overflow-y-auto" aria-label="Directory">
      {Object.keys(directory).map(letter => (
        <div key={letter} className="relative">
          <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>{letter}</h3>
          </div>
          <ul className="relative z-0 divide-y divide-gray-200">
            {directory[letter].map((person: Person) => (
              <li key={person.id} className="bg-white">
                <div className="relative px-6 py-4 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <div className="flex-shrink-0">
                    <img className="h-4 w-4 rounded-full" src={person.imageUrl} alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900">{person.name}</span>&nbsp;
                      <span className="text-sm text-gray-500 truncate">({person.role})</span>
                    </span>
                  </div>

                  <div className="flex-shrink-0 w-48 min-w-0">
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className={classNames("h-2 rounded-full")}
                        style={getProgress(person.progress)}
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export const getProgress = (progress: number): { width: string; background: string } => {
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

export const getHeatMapColor = (index: number): { background: string } => {
  switch (index) {
    case 0:
      return { background: "#df5138" };
    case 1:
      return { background: "#ffa44a" };
    case 2:
      return { background: "#99cc66" };
    case 3:
      return { background: "#47a346" };
    default:
      return { background: "" };
  }
};
