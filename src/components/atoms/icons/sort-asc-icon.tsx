type Props = {
  className?: string;
};

export const SortAscIcon = ({ className }: Props) => {
  return (
    <svg
      className={`${className ? `${className}` : ""} w-7 h-7 shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke="#231F20"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14 9 3-3m0 0 3 3m-3-3v12M5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-4Zm0 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-4Z"
      />
    </svg>
  );
};
