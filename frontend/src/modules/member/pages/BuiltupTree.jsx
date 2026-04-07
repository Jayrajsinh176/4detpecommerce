import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaUser } from "react-icons/fa";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const isActiveMember = (node) => {
  if (!node) return false;

  const statusText = String(node.status ?? "").toLowerCase().trim();

  return (
    node.status === 1 ||
    node.status === "1" ||
    statusText === "active"
  );
};

const formatDate = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

const TreeNode = ({ node, onNodeHover, onNodeLeave }) => {
  const nodeRef = useRef(null);

  const handleMouseEnter = () => {
    if (!node || !isActiveMember(node) || !nodeRef.current) return;

    const rect = nodeRef.current.getBoundingClientRect();

    onNodeHover(node, {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <div className="flex flex-col items-center relative shrink-0">
      <div
        ref={nodeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onNodeLeave}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-sm
        ${
          node?.status === 1 ||
          node?.status === "1" ||
          String(node?.status ?? "").toLowerCase() === "active"
            ? "bg-green-100 text-green-600 cursor-pointer"
            : node
            ? "bg-red-100 text-red-600 cursor-default"
            : "bg-gray-200 text-gray-400 cursor-default"
        }`}
      >
        <FaUser className="text-sm sm:text-base" />
      </div>

      {node && (
        <div className="text-[10px] sm:text-xs text-center mt-2 max-w-[90px] sm:max-w-[110px] break-words">
          <p className="font-medium">{node.user_id}</p>
          <p className="text-gray-500">{node.fullname}</p>
        </div>
      )}

      {(node?.left || node?.right) && (
        <div className="flex flex-col items-center mt-6 sm:mt-8 relative">
          <svg width="2" height="24" className="sm:h-[30px]">
            <line x1="1" y1="0" x2="1" y2="30" stroke="#cbd5e1" strokeWidth="2" />
          </svg>

          <div className="relative flex justify-center gap-10 sm:gap-20 lg:gap-32">
            <svg
              className="absolute -top-4"
              width="100%"
              height="20"
              preserveAspectRatio="none"
            >
              <line
                x1="25%"
                y1="10"
                x2="75%"
                y2="10"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
            </svg>

            <div className="flex flex-col items-center shrink-0">
              <svg width="2" height="18" className="sm:h-[20px]">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="20"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
              </svg>
              <TreeNode
                node={node.left}
                onNodeHover={onNodeHover}
                onNodeLeave={onNodeLeave}
              />
            </div>

            <div className="flex flex-col items-center shrink-0">
              <svg width="2" height="18" className="sm:h-[20px]">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="20"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
              </svg>
              <TreeNode
                node={node.right}
                onNodeHover={onNodeHover}
                onNodeLeave={onNodeLeave}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function BuiltupTree() {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const memberData = JSON.parse(
          localStorage.getItem("memberData") || "{}"
        );

        const res = await fetch(`${API_BASE_URL}/member/tree`, {
          headers: {
            Accept: "application/json",
            "X-Auth-Member": memberData.user_id,
          },
        });

        const data = await res.json();
        setTree(data.tree);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const handleNodeHover = (member, rect) => {
    clearHideTimer();
    setSelectedMember(member);

    const isMobile = window.innerWidth < 640;
    const popupWidth = isMobile ? Math.min(window.innerWidth - 24, 280) : 270;
    const popupHeight = 260;

    let popupLeft = rect.left + rect.width + 12;
    let popupTop = rect.top - 20;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight + window.scrollY;

    if (isMobile) {
      popupLeft = Math.max(
        12,
        Math.min(rect.left - 40, screenWidth - popupWidth - 12)
      );
      popupTop = rect.top + rect.height + 12;
    } else {
      if (popupLeft + popupWidth > screenWidth - 20) {
        popupLeft = rect.left - popupWidth - 12;
      }
    }

    if (popupTop + popupHeight > screenHeight - 20) {
      popupTop = screenHeight - popupHeight - 20;
    }

    if (popupTop < 20) {
      popupTop = 20;
    }

    if (popupLeft < 12) {
      popupLeft = 12;
    }

    setPopupPosition({
      top: popupTop,
      left: popupLeft,
    });
  };

  const handleNodeLeave = () => {
    clearHideTimer();

    hideTimerRef.current = setTimeout(() => {
      if (!isPopupHovered) {
        setSelectedMember(null);
      }
    }, 120);
  };

  const handlePopupEnter = () => {
    clearHideTimer();
    setIsPopupHovered(true);
  };

  const handlePopupLeave = () => {
    setIsPopupHovered(false);
    setSelectedMember(null);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar pageTitle="Builtup Tree" />

        <div className="p-3 sm:p-4 lg:p-6">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#B0422E] mb-4 sm:mb-6">
            Builtup Tree
          </h1>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-10 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
              <span className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                Search Associate :
              </span>

              <input className="bg-gray-100 px-4 py-2 rounded-md outline-none w-full sm:w-[240px]" />

              <button className="bg-[#B0422E] text-white px-5 py-2 rounded-md w-full sm:w-auto">
                Add Address
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-12 text-xs sm:text-sm">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="mt-2 text-gray-500">Empty</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="mt-2 text-gray-500">In Process</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="mt-2 text-gray-500">Active</span>
              </div>
            </div>

            <div className="flex flex-col md:hidden gap-2 mb-6 text-blue-600 font-bold text-xs">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p>Left : 0</p>
                <p>Left PV : 0</p>
                <p>Left BV : 0</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p>Right : 0</p>
                <p>Right PV : 0</p>
                <p>Right BV : 0</p>
              </div>
            </div>

            <div className="hidden md:block absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs lg:text-sm space-y-1">
              <p>Left : 0</p>
              <p>Left PV : 0</p>
              <p>Left BV : 0</p>
            </div>

            <div className="hidden md:block absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs lg:text-sm text-right space-y-1">
              <p>Right : 0</p>
              <p>Right PV : 0</p>
              <p>Right BV : 0</p>
            </div>

            {loading ? (
              <div className="text-center text-gray-500">
                Loading tree...
              </div>
            ) : tree ? (
              <div className="overflow-x-auto">
                <div className="flex justify-center min-w-[700px] sm:min-w-[900px] px-4 sm:px-10 pb-4">
                  <TreeNode
                    node={tree}
                    onNodeHover={handleNodeHover}
                    onNodeLeave={handleNodeLeave}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                No Tree Data Found
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMember && (
        <div
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
          className="absolute z-50 bg-black/75 text-white rounded-xl shadow-lg p-3 sm:p-4 w-[calc(100vw-24px)] max-w-[280px] sm:w-[270px]"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <p className="text-xs sm:text-sm font-semibold pr-5">
            Reg. Date :{" "}
            {selectedMember.created_at
              ? formatDate(selectedMember.created_at)
              : "-"}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            Activation : Rs. {selectedMember.activation_amount ?? "0.00"}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            Team A | Team B : {selectedMember.team_a ?? 0} |{" "}
            {selectedMember.team_b ?? 0}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            A PV | B PV : {selectedMember.a_pv ?? 0} |{" "}
            {selectedMember.b_pv ?? 0}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            A Biz | B Biz : {selectedMember.a_biz ?? 0} |{" "}
            {selectedMember.b_biz ?? 0}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            Self RBV : {selectedMember.self_rbv ?? 0}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            A RBV | B RBV : {selectedMember.a_rbv ?? 0} |{" "}
            {selectedMember.b_rbv ?? 0}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            Designation : {selectedMember.designation ?? "Associate"}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            KYC Status : {selectedMember.kyc_status ?? "UnVerified"}
          </p>
          <p className="text-xs sm:text-sm font-semibold">
            City : {selectedMember.city ?? "-"}
          </p>
        </div>
      )}
    </div>
  );
}