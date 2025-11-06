import { useState } from "react";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import MainRoutes from "./features/MainRoutes";
import { useSelector } from "react-redux";

function App() {
  const { initialized, loading, error, theme } = useSelector(
    (state) => state.async
  );

  return (
    <div>
      <Header title={theme?.site_title} loading={loading} />
      <main className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <MainRoutes initialized={initialized} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
