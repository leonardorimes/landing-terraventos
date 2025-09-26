import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            <Logo size="md" color="white" />
            <a
              href="#sobre"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sobre
            </a>
            <a
              href="#oportunidades"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Oportunidades
            </a>
            <a
              href="#lifestyle"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Lifestyle
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-300">Terra Ventos© 2025</p>
            <div className="flex space-x-4">
              <a
                href="#privacidade"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#acessibilidade"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Acessibilidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
