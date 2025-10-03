import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface VerificationSectionProps {
  verified: boolean;
  onApply: () => void;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  verified,
  onApply,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          Account Verification
        </CardTitle>
        <CardDescription>
          Get verified to build trust with your audience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {verified ? (
          <Alert className="bg-blue-50 border-blue-200">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Your account is verified! This badge shows others that your
              profile is authentic.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Benefits of verification:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Blue verified badge on your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Increased trust and credibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Priority in search and recommendations</span>
                </li>
              </ul>
            </div>
            <Button onClick={onApply} className="w-full sm:w-auto">
              Apply for Verification
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
