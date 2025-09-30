import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary-500 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção principal com logo e navegação */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          {/* Logo e navegação */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 lg:mb-0">
            <Logo size="md" color="white" />
            <div className="flex flex-wrap gap-4 md:gap-8">
              <a
                href="#sobre"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.about")}
              </a>
              <a
                href="#oportunidades"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.opportunities")}
              </a>
              <a
                href="#lifestyle"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t("footer.lifestyle")}
              </a>
            </div>
          </div>

          {/* Endereços */}
          <div className="text-gray-300 text-sm space-y-2">
            <div>
              <p className="font-semibold text-white mb-1">Preá - Cruz</p>
              <p>{t("footer.address.preá")}</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Fortaleza</p>
              <p>{t("footer.address.fortaleza")}</p>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-primary-400 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-300">{t("footer.company")} © 2025</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <a
                href="#politica-privacidade"
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
              <p className="text-gray-300">{t("footer.rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
