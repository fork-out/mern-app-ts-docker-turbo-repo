import React from "react";

import { Spinner } from "./spinner";

type ViewLoaderParams = {
  isLoading: boolean;
  loadingMessage?: string;
};

const ViewLoader: React.FC<ViewLoaderParams> = ({ isLoading, loadingMessage, children }) => {
  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center space-x-2 text-sky-700">
        <Spinner />
        <span>{loadingMessage}</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default ViewLoader;
