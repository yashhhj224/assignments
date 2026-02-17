
import React from "react";

type Props = {
  activeTab: "profile" | "password";
  setActiveTab: (tab: "profile" | "password") => void;
  children: React.ReactNode;
};

const SettingsLayout = ({ activeTab, setActiveTab, children }: Props) => {
  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <div
          style={{
            ...sidebarItemStyle,
            background:
              activeTab === "profile" ? "#1f2937" : "transparent"
          }}
          onClick={() => setActiveTab("profile")}
        >
          Edit Profile
        </div>

        <div
          style={{
            ...sidebarItemStyle,
            background:
              activeTab === "password" ? "#1f2937" : "transparent"
          }}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </div>
      </div>

      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default SettingsLayout;

const containerStyle: React.CSSProperties = {
  display: "flex",
  gap: "32px",
  padding: "32px"
};

const sidebarStyle: React.CSSProperties = {
  width: "220px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const sidebarItemStyle: React.CSSProperties = {
  padding: "12px",
  cursor: "pointer",
  borderRadius: "8px"
};

const contentStyle: React.CSSProperties = {
  flex: 1
};
