import Image from "next/image";
import { Button } from "./components/ui/Button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Foodie!</h1>
      <Button variant="primary">Get Started</Button>
    
    </div>
  );
}
