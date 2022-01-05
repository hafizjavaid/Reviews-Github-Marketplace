import { useContext } from "react";
import AlertContext from "../../context/AlertContext";

function Alert() {
  const { alert } = useContext(AlertContext);

  return (
    alert !== null && (
      <div className="flex items-start justify-center mb-4 space-x-2">
        {alert.type === "error" && (
          <div className="flex items-center">
            <svg
              className="w-6 h-6 flex-none mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#FECDD3"></circle>
              <path
                d="M8 8l8 8M16 8l-8 8"
                stroke="#B91C1C"
                strokeWidth="2"
              ></path>
            </svg>
            <p className="flex-1 text-base ml-2 font-semibold leading-7 text-white">
              <strong>{alert.msg}</strong>
            </p>
          </div>
        )}
      </div>
    )
  );
}

export default Alert;
