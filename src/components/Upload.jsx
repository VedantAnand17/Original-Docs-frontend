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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-heading">
            Welcome to{" "}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Veri-Doc
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Secure Document Verification Platform powered by Blockchain
            Technology
          </p>
          <div className="flex justify-center gap-4 mb-16">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Upload Documents
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Form onFileChange={handleFileChange} />
          </div>

          {/* Status messages */}
          <div className="mt-6 space-y-4">
            {documentHash && (
              <div className="bg-gray-100 p-6 rounded-lg mt-8 w-80 max-w-full border border-gray-200">
                <p className="text-sm text-gray-700 mb-2">Document Hash:</p>
                <p className="font-mono text-blue-600 text-xs break-all">
                  {documentHash}
                </p>
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
                >
                  {isVerifying ? "Verifying..." : "Verify Document"}
                </button>
              </div>
            )}

            {isError && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4 w-80 max-w-full border border-red-200">
                Error: Document hash not found or contract error occurred
              </div>
            )}

            {isVerified !== null && (
              <div
                className={`p-4 rounded-lg mt-4 w-80 max-w-full ${
                  isVerified
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
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
              <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-4 w-80 max-w-full border border-gray-200">
                <p className="text-sm text-gray-700">File: {file.name}</p>
              </div>
            )}

            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-8 mb-16 w-80 max-w-full border border-gray-200">
              <p className="text-sm text-gray-700 mb-2">
                Sample document you can use to verify:
              </p>
              <a
                href="https://pdfhost.io/v/PMzZyzVEdM_AdhaarCard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-medium hover:underline"
              >
                Click here to download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
