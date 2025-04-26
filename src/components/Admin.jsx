import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { ethers } from 'ethers';
import { ABI } from '../abi';
import Form from './UploadIcon';

const contractAddress = "0x793D9Daac0CEDebbC4d0E8d7a4004719FF199baa";

const Admin = () => {
  const [file, setFile] = useState(null);
  const [documentHash, setDocumentHash] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const { address, isConnected } = useAccount();
  
  const {
    writeContractAsync: registerHash,
    isPending,
    isError,
    isSuccess,
  } = useWriteContract();

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

  const handleRegister = async () => {
    if (!isConnected || !documentHash) return;
    
    try {
      setRegistrationStatus('pending');
      
      await registerHash({
        address: contractAddress,
        abi: ABI,
        functionName: 'registerHash',
        args: [documentHash],
      });
      
      setRegistrationStatus('success');
    } catch (error) {
      console.error("Error registering hash:", error);
      setRegistrationStatus('error');
    }
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
      <h2 className="text-2xl font-bold mb-6 text-[#98C1D9]">Register Document Hash</h2>
      
      <div className="flex flex-col items-center">
        <Form onFileChange={handleFileChange} />
        
        {documentHash && (
          <div className="bg-[#1c1c4d] p-6 rounded-lg mt-8 w-full max-w-md">
            <p className="text-sm text-gray-300 mb-2">Document Hash to Register:</p>
            <p className="font-mono text-cyan-400 text-xs break-all">{documentHash}</p>
            <button
              onClick={handleRegister}
              disabled={isPending || !isConnected}
              className="mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:bg-gray-600"
            >
              {isPending ? 'Registering...' : 'Register Document Hash'}
            </button>
          </div>
        )}

        {isError && (
          <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mt-4 w-full max-w-md">
            Error: Failed to register hash. The hash might already be registered or you may not have permission.
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-900/30 text-green-300 p-4 rounded-lg mt-4 w-full max-w-md">
            <p className="font-semibold">✓ Document Hash Registered Successfully!</p>
          </div>
        )}

        {file && (
          <div className="bg-[#1c1c4d] p-4 rounded-lg shadow-md text-center mt-4 w-full max-w-md">
            <p className="text-sm text-gray-300">File: {file.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;