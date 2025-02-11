// components/common/Footer.tsx
const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`${className} bg-gray-800 text-white p-4`}>
      <p className="text-center">© 2025 TimePlanner. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
