import { useAppSelector } from "../../store/reduxHooks";
import AlertMessage from "./AlertMessage";

function Alert({ count = 5 }) {
  const { alert } = useAppSelector((store) => store.user);
  return (
    <div style={{ position: "fixed", bottom: "1rem", right: "1rem", display: "flex", flexDirection: "column", gap: "1rem", zIndex: 9999, alignItems: "end" }}>
      {alert?.map((item) => (
        <AlertMessage key={item.id} {...item} count={count} />
      ))}
    </div>
  );
}

export default Alert;
