import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface HomeProps {
  title: String;
  description: String;
}

const CustomAlert: React.FC<HomeProps> = ({ title, description }) => {
  return (
    <>
      <Alert variant={"destructive"}>
        <Terminal className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </>
  );
};

export default CustomAlert;
