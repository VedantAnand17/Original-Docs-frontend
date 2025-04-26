import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { ethers } from 'ethers';
import { ABI } from '../abi';
import Form from './UploadIcon';
import { useDropzone } from 'react-dropzone';

const contractAddress = "0x793D9Daac0CEDebbC4d0E8d7a4004719FF199baa";

const Admin = () => {
  const [files, setFiles] = useState([]);
  const [documentHashes, setDocumentHashes] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const { address, isConnected } = useAccount();
  
  const {
    writeContractAsync: registerContract,
    isPending,
    isError,
    isSuccess,
  } = useWriteContract();

  // Dropzone for multiple file uploads
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

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFiles(prevFiles => [...prevFiles, selectedFile]);
      const hash = await convertFileToHash(selectedFile);
      if (hash) {
        setDocumentHashes(prevHashes => [...prevHashes, hash]);
      }
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

  const handleSingleRegister = async () => {
    if (!isConnected || documentHashes.length !== 1) return;
    
    try {
      setRegistrationStatus('pending');
      
      await registerContract({
        address: contractAddress,
        abi: ABI,
        functionName: 'registerHash',
        args: [documentHashes[0]],
      });
      
      setRegistrationStatus('success');
    } catch (error) {
      console.error("Error registering hash:", error);
      setRegistrationStatus('error');
    }
  };

  const handleBatchRegister = async () => {
    if (!isConnected || documentHashes.length === 0) return;
    
    try {
      setRegistrationStatus('pending');
      
      await registerContract({
        address: contractAddress,
        abi: ABI,
        functionName: 'registerHashBatch',
        args: [documentHashes],
      });
      
      setRegistrationStatus('success');
    } catch (error) {
      console.error("Error registering batch hashes:", error);
      setRegistrationStatus('error');
    }
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setDocumentHashes(prevHashes => prevHashes.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setDocumentHashes([]);
  };

  if (!isConnected) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-[#98C1D9]">Please connect your wallet to register documents</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#98C1D9]">Register Document Hashes</h2>
      
      {/* Single file upload */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-[#98C1D9]">Upload Single Document</h3>
        <Form onFileChange={handleFileChange} />
      </div>
      
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
            <p className="text-sm text-gray-400 mt-2">For batch registration of document hashes</p>
          </div>
        </div>
      </div>
      
      {/* File list */}
      {files.length > 0 && (
        <div className="bg-[#1c1c4d] p-6 rounded-lg mt-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#98C1D9]">Files to Register ({files.length})</h3>
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
        </div>
      )}
      
      {/* Actions */}
      <div className="flex flex-col space-y-4 mt-6">
        {documentHashes.length === 1 ? (
          <button
            onClick={handleSingleRegister}
            disabled={isPending || !isConnected || documentHashes.length !== 1}
            className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:bg-gray-600 transition-colors"
          >
            {isPending ? 'Registering...' : 'Register Single Document'}
          </button>
        ) : documentHashes.length > 1 ? (
          <button
            onClick={handleBatchRegister}
            disabled={isPending || !isConnected || documentHashes.length === 0}
            className="w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-600 transition-colors"
          >
            {isPending ? 'Registering Batch...' : `Register Batch (${documentHashes.length} Documents)`}
          </button>
        ) : null}
      </div>

      {/* Status messages */}
      {isError && (
        <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mt-4">
          Error: Failed to register hash(es). The hash(es) might already be registered or you may not have permission.
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-900/30 text-green-300 p-4 rounded-lg mt-4">
          <p className="font-semibold">✓ Document Hash(es) Registered Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Admin;