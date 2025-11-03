import type React from "react";
import { Card } from "../ui/card";

export type PaymentIconLink = "wallet" | "card" | "moonpay" | "circle";

type PaymentIconProps = {
  link: PaymentIconLink;
  onSelect: () => void;
  disabled?: boolean;
};

export default function PaymentIcon({
  link,
  onSelect,
  disabled = false,
}: PaymentIconProps) {
  const handleClick = () => {
    if (disabled) return;
    onSelect();
  };

  const srcMap: Record<PaymentIconLink, string> = {
    wallet: "/logo/slush.webp",
    card: "/logo/visa.jpeg",
    moonpay: "/logo/circle.png", // 이미지가 없으므로 임시 대체
    circle: "/logo/circle.png",
  };

  const src = srcMap[link] ?? "/logo/circle.png";

  const interactiveProps = disabled
    ? {
        role: "img" as const,
        tabIndex: -1,
        "aria-disabled": true,
      }
    : {
        role: "button" as const,
        tabIndex: 0,
        onClick: handleClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        },
        "aria-disabled": false,
      };

  return (
    <Card
      className={`relative flex flex-col items-center justify-center border-gray-200 p-4 transition focus:outline-none focus:ring-2 focus:ring-gray-300 ${
        disabled
          ? "cursor-default bg-gray-100 text-gray-400 pointer-events-none"
          : "cursor-pointer hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
      }`}
      {...interactiveProps}
    >
      <div className={`mb-2 h-10 w-10 ${disabled ? "opacity-60" : ""}`}>
        <img src={src} alt={`${link} icon`} className="h-full w-full" />
      </div>
      <span
        className={`text-sm ${disabled ? "text-gray-500" : "text-gray-800"}`}
      >
        {link}
      </span>
    </Card>
  );
}
