/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import Navbar from "./component/Navbar";
import { useDropzone } from "react-dropzone";
import "./App.css";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [userCode, setUserCode] = useState<string>("");
  const [userLang, setUserLang] = useState<string>("python");
  const [userTheme, setUserTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<number>(20);
  const [userOutput, setUserOutput] = useState<string>("");
  const [fileList, setFileList] = useState<Record<string, string>>({});

  const options = {
    fontSize: fontSize,
  };

  const clearOutput = () => {
    setUserOutput("");
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        setUserCode(fileContent);
        setFileList((prevFiles) => ({
          ...prevFiles,
          [file.name]: fileContent,
        }));
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const openFile = (filename: string) => {
    const selectedFileContent = fileList[filename];
    if (selectedFileContent) {
      setUserCode(selectedFileContent);
    }
  };

  return (
    <div className="App">
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        <div className="editor-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem",
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p>Select a file</p>
            </div>
            <button className="run-btn">Run</button>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "20%",
                padding: "1rem",
                backgroundColor: "#333",
                color: "white",
              }}
            >
              <div className="file-nav">
                <h3>File Navigator</h3>
                <ul
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "column",
                  }}
                >
                  {Object.keys(fileList).map((filename) => (
                    <li
                      style={{
                        cursor: "pointer",
                      }}
                      key={filename}
                      onClick={() => openFile(filename)}
                    >
                      {filename}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                padding: "1rem",
              }}
            >
              <MonacoEditor
                options={options}
                height="calc(100vh - 50px)"
                value={userCode}
                width="100%"
                theme={userTheme}
                language={userLang}
                defaultValue="# Enter your code here"
                onChange={(value) => {
                  setUserCode(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="right-container">
          <h4>Output:</h4>
          <div className="output-box">
            <pre>{userOutput}</pre>
            <button onClick={() => clearOutput()} className="clear-btn">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
