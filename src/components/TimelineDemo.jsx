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
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745703138/ezgif.com-cut_1_vag4xm.gif"
              alt="Document Upload"
              width={500}
              height={300}
              className="h-58 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745703671/Screencastfrom2025-04-2703-03-541-ezgif.com-cut_fexyfh.gif"
              alt="Document Upload"
              width={500}
              height={300}
              className="h-58 w-full rounded-lg object-cover shadow-lg"
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
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745703835/ezgif.com-cut_2_gfzkky.gif"
              alt="Hash Generation"
              width={500}
              height={300}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745703941/ezgif.com-video-to-gif-converter_mgk1mf.gif"
              alt="Hash Generation"
              width={500}
              height={300}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
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
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745704342/ezgif.com-video-to-gif-converter_1_gnn73w.gif"
              alt="Blockchain Verification"
              width={500}
              height={300}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745704419/ezgif.com-video-to-gif-converter_2_cxxjit.gif"
              width={500}
              height={300}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
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
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745704342/ezgif.com-video-to-gif-converter_1_gnn73w.gif"
              alt="Blockchain Verification"
              width={500}
              height={300}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src="https://res.cloudinary.com/dduzorsii/image/upload/v1745704419/ezgif.com-video-to-gif-converter_2_cxxjit.gif"
              width={500}
              height={300}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
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
