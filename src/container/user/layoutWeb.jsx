
import Header from "../layout/header";
import Navbar from "../layout/navbar";

function LayoutWeb({children}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex pt-20 ">
          <Navbar />
          <main className=" bg-gray-100 w-5/6 min-h-screen h-screen pt-20 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default LayoutWeb;
