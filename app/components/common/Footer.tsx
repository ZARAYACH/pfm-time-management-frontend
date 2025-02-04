const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12 fixed bottom-0 w-full">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2024 TimePlanner - Tous droits réservés</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-blue-400">Contact</a>
            <a href="#" className="hover:text-blue-400">Mentions légales</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;