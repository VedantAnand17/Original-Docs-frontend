import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { ethers } from "ethers";
import { ABI } from "../abi";
import Form from "./UploadIcon";

const contractAddress = "0x793D9Daac0CEDebbC4d0E8d7a4004719FF199baa";
const contractABI = ABI;

function Upload() {
  const [file, setFile] = useState(null);
  const [documentHash, setDocumentHash] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  const {
    data: isHashVerified,
    isError,
    isLoading: isVerifying,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "verifyHash",
    args: documentHash ? [documentHash] : undefined,
    enabled: !!documentHash,
  });

  useEffect(() => {
    if (isHashVerified) {
      const [verified, timestampBigInt] = isHashVerified;
      setIsVerified(verified);
      setTimestamp(verified ? formatTimestamp(timestampBigInt) : null);
    }
  }, [isHashVerified]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    }).format(date);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await convertFileToHash(selectedFile);
    }
  };

  const convertFileToHash = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const fileBytes = new Uint8Array(arrayBuffer);
      const hash = `0x${ethers.keccak256(fileBytes).slice(2)}`;
      setDocumentHash(hash);
    } catch (error) {
      console.error("Error generating document hash:", error);
    }
  };

  const handleVerify = () => {
    if (!documentHash || !isHashVerified) return;
    // Verification happens automatically through the useReadContract hook
  };

  return (
    <div className="bg-[#020223] min-h-screen">
      <div className="text-[#98C1D9] justify-center flex flex-col items-center font-bold text-6xl font-sans py-11.5">
        Welcome to Veri-Doc
      </div>
      <div className="text-[#c5cae9] mt-4 justify-center flex flex-col items-center text-3xl">
        Authentic at Heart. Original by Nature. Verified by Truth
      </div>

      <div className="flex flex-col items-center pt-16">
        <Form onFileChange={handleFileChange} />

        {documentHash && (
          <div className="bg-[#1c1c4d] p-6 rounded-lg mt-8 w-80 max-w-full">
            <p className="text-sm text-gray-300 mb-2">Document Hash:</p>
            <p className="font-mono text-cyan-400 text-xs break-all">
              {documentHash}
            </p>
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-600"
            >
              {isVerifying ? "Verifying..." : "Verify Document"}
            </button>
          </div>
        )}

        {isError && (
          <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mt-4 w-80 max-w-full">
            Error: Document hash not found or contract error occurred
          </div>
        )}

        {isVerified !== null && (
          <div
            className={`p-4 rounded-lg mt-4 w-80 max-w-full ${
              isVerified
                ? "bg-green-900/30 text-green-300"
                : "bg-red-900/30 text-red-300"
            }`}
          >
            {isVerified ? (
              <>
                <p className="font-semibold">✓ Document Verified!</p>
                <p className="text-sm mt-1">Registered on: {timestamp}</p>
              </>
            ) : (
              <p className="font-semibold">✗ Document Not Verified</p>
            )}
          </div>
        )}

        {file && (
          <div className="bg-[#1c1c4d] p-4 rounded-lg shadow-md text-center mt-4 w-80 max-w-full">
            <p className="text-sm text-gray-300">File: {file.name}</p>
          </div>
        )}

        <div className="bg-[#1c1c4d] p-4 rounded-lg shadow-md text-center mt-8 mb-16 w-80 max-w-full">
          <p className="text-sm text-gray-300 mb-2">
            Sample document you can use to verify:
          </p>
          <a
            href="https://pdfhost.io/v/PMzZyzVEdM_AdhaarCard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-medium hover:underline"
          >
            Click here to download
          </a>
        </div>
      </div>
    </div>
  );
}

export default Upload;
