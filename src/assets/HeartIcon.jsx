const HeartIcon = ({ isActive }) => {
  return (
    <svg
      className="icon"
      width="20"
      height="20"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 28.5C15.6 28.5 15.2 28.3 14.9 28.1C12.7 26.2 10.6 24.3 8.7 22.4C5.3 19 2.7 15.9 2.7 12.3C2.7 8.5 5.6 5.5 9.3 5.5C11.5 5.5 13.6 6.7 15 8.4C16.4 6.7 18.5 5.5 20.7 5.5C24.4 5.5 27.3 8.5 27.3 12.3C27.3 15.9 24.7 19 21.3 22.4C19.4 24.3 17.3 26.2 15.1 28.1C14.8 28.3 14.4 28.5 14 28.5H16Z"
        fill={isActive ? "#3470ff" : "none"}
        stroke={isActive ? "#3470ff" : "#ffffff"}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HeartIcon;
