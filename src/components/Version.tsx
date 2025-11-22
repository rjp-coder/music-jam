import { motion } from "motion/react";
import { useEffect, useState } from "react";

function getShorterTimestamp(timestampStr) {
  return timestampStr.substring(0, timestampStr.length - 8);
}

export const Version = () => {
  const [newV, setNewV] = useState("");

  useEffect(() => {
    function showUpdateBanner(newV) {
      setNewV(newV);
      const banner = document.createElement("div");
      banner.textContent =
        "A new version of this site is available. Click to refresh.";
      banner.style =
        "position: fixed; bottom: 0; width: 100%; padding: 12px; background: #333; color: white; text-align: center; cursor: pointer;";
      banner.onclick = () => {
        location.reload();
      };
      document.body.appendChild(banner);
    }

    async function checkVersion() {
      const localVersion = __BUILD_VERSION__;
      const res = await fetch("version.json", {
        cache: "no-store",
      });
      const text = await res.text();
      //   console.log("Raw response:", text);
      let data;

      try {
        data = JSON.parse(text);
        // console.log("Parsed JSON:", data);
      } catch (err) {
        console.error("JSON parse error:", err);
        return;
      }

      console.log({ dataVersion: data.version, localVersion });

      if (data.version !== localVersion) {
        showUpdateBanner(data.version);
      }
    }
    // Check every 20 seconds
    setInterval(checkVersion, 20000);
  }, []);
  return (
    <div>
      <span className="text-sm ">
        {"version: " + getShorterTimestamp(__BUILD_VERSION__)}
      </span>
      {newV && (
        <motion.span
          onClick={() => window.location.reload}
          className="cursor-pointer text-transparent bg-clip-text font-bold text-sm "
          style={{
            // duplicate the rainbow gradient horizontally for seamless looping
            background:
              "linear-gradient(90deg, #f0f, #00f, #0ff, #0f0, #ff0, #f00, #f0f, #00f, #0ff, #0f0, #ff0, #f00)",
            backgroundSize: "200% 100%", // make the duplicated gradient fit exactly twice
          }}
          animate={{
            backgroundPositionX: ["109%", "0%"], // move by exact amount required to prevent "jumping"
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {" ⇒ " + "version: " + getShorterTimestamp(newV) + " available"}
        </motion.span>
      )}
    </div>
  );
};
