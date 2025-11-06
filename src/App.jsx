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
      <main className="">
        <MainRoutes initialized={initialized} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
