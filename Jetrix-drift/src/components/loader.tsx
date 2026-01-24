import { useEffect, useState } from "react";
import logo from "../assets/Jetrix_Logo.png";

function Loader() {
  const [particles, setParticles] = useState<
    Array<{ id: number; angle: number; offset: number }>
  >([]);

  useEffect(() => {
    // Generate dust particles continuously
    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticle = {
          id: Date.now(),
          angle: Math.random() * 360,
          offset: Math.random() * 10,
        };
        // Keep only recent particles
        const filtered = prev.filter((p) => Date.now() - p.id < 800);
        return [...filtered, newParticle];
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed w-100 h-100 flex items-center justify-center align-middle top-40 left-120 rounded-lg bg-white">
        {/* Rotating car container */}
        <div className="absolute inset-0 animate-spin-slow">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transformOrigin: "center",
              transform: "translate(-50%, -50%) translateY(-70px)",
            }}
          >
            {/* Car SVG */}
            <div className="animate-car-tilt">
              <svg
                width="46"
                height="23"
                viewBox="0 0 46 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                // className="drop-shadow-[0_2px_8px_rgba(1,1,1,.6)]"
              >
                <g id="mainContainer">
                  <g id="car">
                    <path
                      id="carRot"
                      fill="#000000ff"
                      d="M45.6,16.9l0-11.4c0-3-1.5-5.5-4.5-5.5L3.5,0C0.5,0,0,1.5,0,4.5l0,13.4c0,3,0.5,4.5,3.5,4.5l37.6,0C44.1,22.4,45.6,19.9,45.6,16.9z M31.9,21.4l-23.3,0l2.2-2.6l14.1,0L31.9,21.4z M34.2,21c-3.8-1-7.3-3.1-7.3-3.1l0-13.4l7.3-3.1C34.2,1.4,37.1,11.9,34.2,21z M6.9,1.5c0-0.9,2.3,3.1,2.3,3.1l0,13.4c0,0-0.7,1.5-2.3,3.1C5.8,19.3,5.1,5.8,6.9,1.5z M24.9,3.9l-14.1,0L8.6,1.3l23.3,0L24.9,3.9z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Center logo/badge */}
          <img src={logo} alt="" className="relative z-10 w-40 h-40 "/>


        {/* Custom styles */}
        <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        @media (max-width: 768px) {
          .fixed {
            top: 20px;
            left: 20px;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
          }
        }
      `}</style>
      </div>
  );
}
// Export Loader Component
export default Loader;
