import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import { ABI } from '../abi';
import { useDropzone } from 'react-dropzone';

const contractAddress = "0x793D9Daac0CEDebbC4d0E8d7a4004719FF199baa";

const ClientBatch = () => {
  const [files, setFiles] = useState([]);
  const [documentHashes, setDocumentHashes] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  // Using useReadContract for batch verification
  const { data: batchVerificationData, isError, isLoading: isVerifying, refetch } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'verifyHashBatch',
    args: documentHashes.length > 0 ? [documentHashes] : undefined,
    enabled: false, // Don't auto-execute, we'll call it manually
  });

  // Dropzone configuration for multiple file uploads
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
      processFiles(acceptedFiles);
    }
  });

  const processFiles = async (newFiles) => {
    try {
      const hashes = await Promise.all(newFiles.map(async (file) => {
        const hash = await convertFileToHash(file);
        return hash;
      }));

      setDocumentHashes(prevHashes => [...prevHashes, ...hashes.filter(Boolean)]);
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };

  const convertFileToHash = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const fileBytes = new Uint8Array(arrayBuffer);
      const hash = `0x${ethers.keccak256(fileBytes).slice(2)}`;
      return hash;
    } catch (error) {
      console.error(`Error generating hash for ${file.name}:`, error);
      return null;
    }
  };

  const handleVerifyBatch = async () => {
    if (documentHashes.length === 0) return;
    setIsVerificationComplete(false);
    
    try {
      const result = await refetch();
      if (result.data) {
        setIsVerificationComplete(true);
      }
    } catch (error) {
      console.error("Error verifying documents in batch:", error);
    }
  };

  useEffect(() => {
    if (batchVerificationData && isVerificationComplete) {
      const [verified, timestamps] = batchVerificationData;
      
      // Create combined results with file info, hash, verification status and timestamp
      const results = files.map((file, index) => ({
        file: file,
        hash: documentHashes[index],
        isVerified: verified[index],
        timestamp: verified[index] ? formatTimestamp(timestamps[index]) : null
      }));
      
      setVerificationResults(results);
    }
  }, [batchVerificationData, isVerificationComplete]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long'
    }).format(date);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setDocumentHashes(prevHashes => prevHashes.filter((_, i) => i !== index));
    setVerificationResults(prevResults => prevResults.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setDocumentHashes([]);
    setVerificationResults([]);
    setIsVerificationComplete(false);
  };

  return (
    <div className="max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl font-bold mb-6 text-[#98C1D9]">Batch Verify Documents</h2>
      
      {/* Multiple file upload */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-[#98C1D9]">Upload Multiple Documents</h3>
        <div 
          {...getRootProps()} 
          className="border-2 border-dashed border-[#3d3d7a] rounded-lg p-6 cursor-pointer hover:bg-[#1a1a46] transition-colors duration-300"
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <p className="text-[#98C1D9]">Drag and drop multiple files here, or click to select files</p>
            <p className="text-sm text-gray-400 mt-2">Verify multiple documents at once</p>
          </div>
        </div>
      </div>
      
      {/* File list */}
      {files.length > 0 && (
        <div className="bg-[#1c1c4d] p-6 rounded-lg mt-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#98C1D9]">Files to Verify ({files.length})</h3>
            <button
              onClick={clearAll}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="max-h-60 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-2 mb-2 bg-[#25254d] rounded"
              >
                <div className="truncate flex-1">
                  <p className="text-sm text-gray-300">{file.name}</p>
                  <p className="text-xs text-cyan-400 truncate">{documentHashes[index]}</p>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="ml-2 text-gray-400 hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleVerifyBatch}
            disabled={isVerifying || documentHashes.length === 0}
            className="mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-600"
          >
            {isVerifying ? 'Verifying...' : 'Verify All Documents'}
          </button>
        </div>
      )}

      {/* Verification Results */}
      {isVerificationComplete && verificationResults.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-[#98C1D9]">Verification Results</h3>
          
          <div className="space-y-4">
            {verificationResults.map((result, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${result.isVerified ? 'bg-green-900/30 border border-green-800/50' : 'bg-red-900/30 border border-red-800/50'}`}
              >
                <div className="flex justify-between items-center">
                  <h4 className={`font-medium ${result.isVerified ? 'text-green-300' : 'text-red-300'}`}>
                    {result.file.name}
                  </h4>
                  <span className={`text-sm font-semibold rounded-full px-2 py-1 ${result.isVerified ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'}`}>
                    {result.isVerified ? '✓ Verified' : '✗ Not Verified'}
                  </span>
                </div>
                
                <p className="text-xs font-mono text-gray-400 mt-2 break-all">
                  Hash: {result.hash}
                </p>
                
                {result.timestamp && (
                  <p className="text-sm mt-2 text-gray-300">
                    Registered on: {result.timestamp}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {verificationResults.filter(r => r.isVerified).length} of {verificationResults.length} documents verified
            </p>
          </div>
        </div>
      )}

      {isError && (
        <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mt-4">
          Error: Failed to verify document hashes. The smart contract may be unavailable.
        </div>
      )}
    </div>
  );
};

export default ClientBatch;