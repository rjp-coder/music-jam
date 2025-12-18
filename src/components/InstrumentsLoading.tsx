import { useInstrumentsLoaded } from "../hooks/useInstrumentsLoaded";

export const LoadingProgress = () => {
  const { instruments, getProgress, isLoading } = useInstrumentsLoaded();
  const thisIsABrowser = globalThis.window;
  if (!thisIsABrowser)
    return (
      <p className="text-orange-400 text-xl -mt-4">Loading (javascript) </p>
    );
  const { loaded, total } = getProgress();
  return (
    <details>
      <summary
        className={`text-xl -mt-4 ${!isLoading() && "invisible"}`}
      >{`Loading instruments (${loaded}/${total})`}</summary>
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
