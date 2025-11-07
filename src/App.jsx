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
      <Header title={theme?.site_title} menus={header_menus} loading={loading} />
      <main className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MainRoutes initialized={initialized} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
