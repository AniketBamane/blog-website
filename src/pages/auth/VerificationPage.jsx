import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerificationPage() {
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Website Name */}
      <h1 className="text-4xl font-bold mb-2">MyBlogs</h1>

      {/* Tagline */}
      <p className="text-xl mb-8 text-gray-600">
        Your Daily Dose of Insights and Inspiration {/* Use any tagline here */}
      </p>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <form>
          {/* Email Field */}
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Enter your email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
}
