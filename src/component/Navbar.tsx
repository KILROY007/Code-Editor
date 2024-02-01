/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import "./Navbar.css";

interface NavbarProps {
  userLang: string;
  setUserLang: Dispatch<SetStateAction<string>>;
  userTheme: string;
  setUserTheme: Dispatch<SetStateAction<string>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
}

const Navbar: React.FC<NavbarProps> = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="navbar">
      <h1>Code Compiler</h1>
      <Select
        options={languages}
        value={{ value: userLang, label: userLang }}
        onChange={(e: any) => setUserLang(e?.value || "")}
        placeholder={userLang}
      />
      <Select
        options={themes}
        value={{ value: userTheme, label: userTheme }}
        onChange={(e: any) => setUserTheme(e?.value || "")}
        placeholder={userTheme}
      />
      <label>Font Size</label>
      <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(Number(e.target.value));
        }}
      />
    </div>
  );
};

export default Navbar;
