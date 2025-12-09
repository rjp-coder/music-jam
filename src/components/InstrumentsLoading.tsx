import { useInstrumentsLoaded } from "../hooks/useInstrumentsLoaded";

export const InstrumentsLoading = () => {
  const { instruments, getProgress, isLoading } = useInstrumentsLoaded();
  if (!isLoading()) return;
  const { loaded, total } = getProgress();
  return (
    <details>
      <summary>{`Loading instruments (${loaded}/${total})`}</summary>
      <ul>
        {Object.entries(instruments).map((il) => {
          const [k, v] = il;
          return (
            <li key={k}>
              {k} {v ? "✅" : "⏳"}
            </li>
          );
        })}
      </ul>
    </details>
  );
};
