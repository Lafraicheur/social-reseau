import ErrorImage from "@/assets/404.png"; // Assurez-vous que le chemin est correct
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="my-12 w-full space-y-3 text-center">
      <h1 className="text-3xl font-bold">Pas trouvé</h1>
      <p>La page que vous recherchez n&apos;existe pas.</p>
      <Image
        src={ErrorImage}
        alt="Page non trouvée"
        width={500}
        height={300}
      />
    </main>
  );
}
