import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Step 1: Upload Document",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            Upload your document (PDF, image, etc). The system will calculate a
            unique hash for your document:
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Drag and drop files directly
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Select files from your device
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Support for multiple file formats
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
      title: "Step 2: Generate Hash",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            We use the keccak256 algorithm to generate a unique cryptographic
            hash that represents your document.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Secure hashing algorithm
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Unique digital fingerprint
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Tamper-proof document verification
            </div>
          </div>
          <div className="grid grid-cols-1">
            <img
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
              alt="Hash Generation"
              width={500}
              height={300}
              className="h-32 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Verify on Blockchain",
      content: (
        <div>
          <p className="mb-4 text-sm font-normal text-gray-700">
            The system checks if your document hash exists on the blockchain
            using a smart contract.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Immutable blockchain verification
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Smart contract integration
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Decentralized authentication
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
            Check verification status and registration time on the blockchain.
          </p>
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Instant verification results
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Registration timestamp
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ✅ Detailed document history
            </div>
          </div>
          <div className="grid grid-cols-1">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
              alt="View Results"
              width={500}
              height={300}
              className="h-32 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip p-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        How It Works
      </h2>
      <Timeline data={data} />
    </div>
  );
}
