import React from "react";
import { Timeline } from "@/components/ui/timeline";

const Verify = () => {
  const verificationSteps = [
    {
      title: "Step 1: Upload Document",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            Begin by uploading your document through our secure interface. You
            can:
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Drag and drop files directly
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Click to browse and select files
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Upload PDFs, images, and document files
            </div>
          </div>
          <div className="grid grid-cols-1">
            <img
              src="https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1471&auto=format&fit=crop"
              alt="Document Upload"
              width={500}
              height={300}
              className="h-32 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Document Processing",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            After uploading, our system automatically processes your document:
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Creates a unique cryptographic hash (digital fingerprint)
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Uses keccak256 hashing algorithm for security
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Prepares the hash for blockchain verification
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Blockchain Verification",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            With a single click, verify your document's authenticity:
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Smart contract checks for hash presence on blockchain
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Retrieves timestamp if document is verified
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Tamper-proof verification process
            </div>
          </div>
          <div className="grid grid-cols-1">
            <img
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop"
              alt="Blockchain Verification"
              width={500}
              height={300}
              className="h-32 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 4: View Results",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            Get immediate verification results:
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Clear verification status (Verified/Not Verified)
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Registration timestamp for verified documents
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Document hash displayed for transparency
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-white">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">How to Verify?</h1>
        <Timeline data={verificationSteps} />
      </div>
    </div>
  );
};

export default Verify;
