import { useSplendorInteractions } from "./hooks/useSplendorInteractions";
import Nav from "./components/Nav";
import Heroes from "./components/Heroes";
import Dor from "./components/sections/Dor";
import Pilares from "./components/sections/Pilares";
import Servicos from "./components/sections/Servicos";
import Metodo from "./components/sections/Metodo";
import Comparacao from "./components/sections/Comparacao";
import Tecnologia from "./components/sections/Tecnologia";
import MeuPlano from "./components/sections/MeuPlano";
import ControleRemoto from "./components/sections/ControleRemoto";
import QuemSomos from "./components/sections/QuemSomos";
import CtaFinal from "./components/sections/CtaFinal";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import HeroSwitch from "./components/HeroSwitch";
import Lightbox from "./components/Lightbox";

export default function App() {
  useSplendorInteractions();

  return (
    <>
      <Nav />
      <main id="top">
        <Heroes />
        <Dor />
        <Pilares />
        <Servicos />
        <Metodo />
        <Comparacao />
        <Tecnologia />
        <MeuPlano />
        <ControleRemoto />
        <QuemSomos />
        <CtaFinal />
      </main>
      <Lightbox />
      <Footer />
      <WhatsappFloat />
      <HeroSwitch />
    </>
  );
}
