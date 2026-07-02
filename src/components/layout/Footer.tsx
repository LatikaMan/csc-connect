export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold">CSC Connect</h2>
        <p className="mt-2 text-gray-400">
          Connecting Citizens with Government Services
        </p>

        <div className="mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} CSC Connect. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}