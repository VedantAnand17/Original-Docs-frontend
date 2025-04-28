import React, { useState } from "react";
import { useReadContract } from "wagmi";
import { ethers } from "ethers";
import { ABI } from "../abi";
import Form from "./UploadIcon";
import { useDropzone } from "react-dropzone";
import DocumentVerificationIllustration from "./illustrations/DocumentVerification";
import { AnimatedFade, AnimatedScale } from "@/components/ui/AnimatedFade";

const contractAddress = "0x793D9Daac0CEDebbC4d0E8d7a4004719FF199baa";

const Client = () => {
  // Toggle between single and batch verification
  const [verificationMode, setVerificationMode] = useState("single");

  // Single document state
  const [file, setFile] = useState(null);
  const [documentHash, setDocumentHash] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  // Batch verification state
  const [files, setFiles] = useState([]);
  const [documentHashes, setDocumentHashes] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  // Single document verification
  const {
    data: isHashVerified,
    isError: isSingleError,
    isLoading: isVerifyingSingle,
    refetch: refetchSingle,
  } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: "verifyHash",
    args: documentHash ? [documentHash] : undefined,
    enabled: false, // Changed to false to prevent auto-execution
    watch: false,
  });

  // Batch verification
  const {
    data: batchVerificationData,
    isError: isBatchError,
    isLoading: isVerifyingBatch,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: "verifyHashBatch",
    args: documentHashes.length > 0 ? [documentHashes] : undefined,
    enabled: false, // Don't auto-execute, we'll call it manually
  });

  // Handle single document verification result
  React.useEffect(() => {
    if (isHashVerified && verificationMode === "single") {
      const [verified, timestampBigInt] = isHashVerified;
      setIsVerified(verified);
      setTimestamp(verified ? formatTimestamp(timestampBigInt) : null);
    } else if (documentHash && isSingleError) {
      // Handle unverified documents same way as batch verification
      setIsVerified(false);
      setTimestamp(null);
    }
  }, [isHashVerified, isSingleError, documentHash, verificationMode]);

  // Handle batch verification result
  React.useEffect(() => {
    if (batchVerificationData && isVerificationComplete) {
      const [verified, timestamps] = batchVerificationData;

      // Create combined results with file info, hash, verification status and timestamp
      const results = files.map((file, index) => ({
        file: file,
        hash: documentHashes[index],
        isVerified: verified[index],
        timestamp: verified[index] ? formatTimestamp(timestamps[index]) : null,
      }));

      setVerificationResults(results);
    }
  }, [batchVerificationData, isVerificationComplete]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    }).format(date);
  };

  // Single file handling
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
      return hash;
    } catch (error) {
      console.error("Error generating document hash:", error);
      return null;
    }
  };

  // Batch file handling
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      processFiles(acceptedFiles);
    },
  });

  const processFiles = async (newFiles) => {
    try {
      const hashes = await Promise.all(
        newFiles.map(async (file) => {
          const hash = await convertFileToHash(file);
          return hash;
        })
      );

      setDocumentHashes((prevHashes) => [
        ...prevHashes,
        ...hashes.filter(Boolean),
      ]);
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };

  const handleVerifyBatch = async () => {
    if (documentHashes.length === 0) return;
    setIsVerificationComplete(false);

    try {
      const result = await refetch();
      if (result.data) {
        setIsVerificationComplete(true);
      } else {
        // Handle case where verification fails
        const results = files.map((file, index) => ({
          file: file,
          hash: documentHashes[index],
          isVerified: false,
          timestamp: null,
        }));
        setVerificationResults(results);
        setIsVerificationComplete(true);
      }
    } catch (error) {
      // Handle error case by marking all documents as unverified
      const results = files.map((file, index) => ({
        file: file,
        hash: documentHashes[index],
        isVerified: false,
        timestamp: null,
      }));
      setVerificationResults(results);
      setIsVerificationComplete(true);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setDocumentHashes((prevHashes) => prevHashes.filter((_, i) => i !== index));
    setVerificationResults((prevResults) =>
      prevResults.filter((_, i) => i !== index)
    );
  };

  const clearAll = () => {
    setFiles([]);
    setDocumentHashes([]);
    setVerificationResults([]);
    setIsVerificationComplete(false);
  };

  // Switch verification mode
  const handleModeChange = (mode) => {
    setVerificationMode(mode);
    // Reset states when switching modes
    if (mode === "single") {
      setFiles([]);
      setDocumentHashes([]);
      setVerificationResults([]);
      setIsVerificationComplete(false);
    } else {
      setFile(null);
      setDocumentHash(null);
      setIsVerified(null);
      setTimestamp(null);
    }
  };

  // Add a handle verify function for single document
  const handleVerifySingle = async () => {
    if (!documentHash) return;
    try {
      const result = await refetchSingle();
      if (result.data) {
        const [verified, timestampBigInt] = result.data;
        setIsVerified(verified);
        setTimestamp(verified ? formatTimestamp(timestampBigInt) : null);
      }
    } catch (error) {
      console.error("Error verifying document:", error);
      setIsVerified(false);
      setTimestamp(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatedFade>
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Verify Your Document
        </h2>
      </AnimatedFade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <AnimatedFade delay={0.2}>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Document Verification Made Simple
            </h1>
            <p className="text-lg text-gray-600">
              F*ck Forgery, Stay Original.
            </p>
          </div>
        </AnimatedFade>

        <AnimatedScale delay={0.4}>
          <div className="flex justify-center items-center">
            <DocumentVerificationIllustration className="w-full max-w-md" />
          </div>
        </AnimatedScale>
      </div>

      {/* Verification mode toggle */}
      <div className="flex justify-center mb-8">
        <div
          className="inline-flex rounded-md shadow-sm bg-gray-100 p-1"
          role="group"
        >
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              verificationMode === "single"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
            onClick={() => handleModeChange("single")}
          >
            Single Document
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              verificationMode === "batch"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
            onClick={() => handleModeChange("batch")}
          >
            Batch Verification
          </button>
        </div>
      </div>

      {/* Single Document Verification */}
      {verificationMode === "single" && (
        <div className="flex flex-col items-center">
          <Form onFileChange={handleFileChange} />

          {documentHash && (
            <div className="bg-gray-100 p-6 rounded-lg mt-8 w-full max-w-md border border-gray-200">
              <p className="text-sm text-gray-700 mb-2">Document Hash:</p>
              <p className="font-mono text-blue-600 text-xs break-all">
                {documentHash}
              </p>
              <button
                onClick={handleVerifySingle}
                disabled={isVerifyingSingle}
                className="mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
              >
                {isVerifyingSingle ? "Verifying..." : "Verify Document"}
              </button>
            </div>
          )}

          {isVerified !== null && (
            <div
              className={`p-4 rounded-lg mt-4 w-full max-w-md ${
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
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-4 w-full max-w-md border border-gray-200">
              <p className="text-sm text-gray-700">File: {file.name}</p>
            </div>
          )}
        </div>
      )}

      {/* Batch Document Verification */}
      {verificationMode === "batch" && (
        <div>
          {/* Multiple file upload */}
          <div className="mb-8">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <p className="text-gray-700">
                  Drag and drop multiple files here, or click to select files
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Verify multiple documents at once
                </p>
              </div>
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="bg-gray-100 p-6 rounded-lg mt-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Files to Verify ({files.length})
                </h3>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 mb-2 bg-white rounded border border-gray-200"
                  >
                    <div className="truncate flex-1">
                      <p className="text-sm text-gray-700">{file.name}</p>
                      <p className="text-xs text-blue-600 truncate">
                        {documentHashes[index]}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleVerifyBatch}
                disabled={isVerifyingBatch || documentHashes.length === 0}
                className="mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
              >
                {isVerifyingBatch ? "Verifying..." : "Verify All Documents"}
              </button>
            </div>
          )}

          {/* Verification Results */}
          {isVerificationComplete && verificationResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Verification Results
              </h3>

              <div className="space-y-4">
                {verificationResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      result.isVerified
                        ? "bg-green-100 border border-green-200"
                        : "bg-red-100 border border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4
                        className={`font-medium ${
                          result.isVerified ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {result.file.name}
                      </h4>
                      <span
                        className={`text-sm font-semibold rounded-full px-2 py-1 ${
                          result.isVerified
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {result.isVerified ? "✓ Verified" : "✗ Not Verified"}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-gray-600 mt-2 break-all">
                      Hash: {result.hash}
                    </p>

                    {result.timestamp && (
                      <p className="text-sm mt-2 text-gray-700">
                        Registered on: {result.timestamp}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  {verificationResults.filter((r) => r.isVerified).length} of{" "}
                  {verificationResults.length} documents verified
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add this under your existing verification UI: */}
      <div className="bg-gray-100 m-auto p-4 rounded-lg shadow-md text-center mt-8 mb-16 w-80 max-w-full border border-gray-200">
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
  );
};

export default Client;
