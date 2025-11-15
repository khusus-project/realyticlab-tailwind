import { useState } from "react";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import MainRoutes from "./features/MainRoutes";
import { useSelector } from "react-redux";

function App() {
  const { initialized, loading, error, theme } = useSelector(
    (state) => state.async
  );

  const header_menus = theme?.supports?.menus?.primary_menu?.items || [];

  return (
    <div>
      <Header
        title={theme?.site_title}
        menus={header_menus}
        loading={loading}
      />
      <MainRoutes initialized={initialized} />
      <Footer />
    </div>
  );
}

export default App;
