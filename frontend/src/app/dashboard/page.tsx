"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Cardslider from "@/components/Cardslider";
import ScrollContainer from "@/components/Scrollcontainer";
import AiSuggestionsChat from "@/components/AiSuggestionsChat/AiSuggestionsChat";
import { getFutureMonths } from "@/utils/getFutureMonths";


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black flex px-4">
      <Sidebar />
      <div className="w-full px-6 sm:px-10 pt-6 relative">
        <div className="flex flex-row justify-between">
          {" "}
          <h1 className="text-xl font-bold text-white">Buenos dias Karim</h1>
          {/* Imagen de perfil */}
          <div className="flex justify-end pr-2 sm:pr-4">
            <Image
              src="/profile.png"
              alt="Perfil"
              className="rounded-full object-cover border border-white/20"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <div className="flex flex-row w-full mt-4 justify-between items-center">
              <div className="bg-[#212226] rounded-lg shadow-md font-bold px-6 py-3">
                <h1 className="text-center">Carbono Emitido</h1>
                <div className="flex flex-row gap-10 justify-center items-center">
                  <h1 className="text-4xl">-2,8%</h1>
                  <img
                    className="w-24 h-32 -rotate-90"
                    src="https://s3-alpha-sig.figma.com/img/f9d6/42a3/d5a61ee10533b266be9921ed42fc868c?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pjzm9FzSUs1KBbpZFTqwl7a2oROjw70asAEq-zW1eBK~KPPaLnZtmBc3859dlIHiTfCf4kbxq2pAPCvMqU-jaq9nVCHSBwV2iM7hS224r0I77DNg0p6FLSRlRUWYwuPieZVSxuNPEsfGmasZIoAOgeFTMTHrYiREMw36LY9R5d7hK0T44kpR4NqZxJpWEmpZXhSXNOTHZY8GPvs-sWKBPcCRwyZ2PKbvJpWXdH~yYDiHFvWuGQd4D5RWwLE9B79AtSF1eT59NioEkYnXyNiLvvcPt30uGrqxRbkiaZ~GBkk3Q~Sh~9KZ9yzH2ZkM3FJg-qEdLaK1f7ut1HvXO21pXg__"
                  ></img>
                </div>
              </div>
              <div className="bg-[#212226] rounded-lg shadow-md font-bold px-6 py-3">
                <h1 className="text-center">Transporte</h1>
                <div className="flex flex-row gap-10 justify-center items-center">
                  <h1 className="text-4xl">+5,3%</h1>
                  <img
                    className="w-24 h-32 -rotate-90"
                    src="https://s3-alpha-sig.figma.com/img/0c2b/a701/d16010ba86858142f64ee0cb69aedacc?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EmZtI50-E-ZQH7-2QlZpVVq3cukRgSTRSboPkjo4Vuk4STjVeQh5rDa9SdHdNceE3Zsyqm22pZ9Z-zczbVAPC4O3DLqOt4HMMY44eVfIRx0MRM0PSasCCknYipUxVY0t1GM9N8Xk0Eexvy70DqZOC8GsFlLWmTe0AoMrZ9JtJHzTpwXEorvkVhKEShupNjdfjkASz9pjeVCudP0tvZlJ~7qxrADq4jGbXvJJ65L4R49aFtxCpd~xLnQ01ri1pWur0~kAmRuiGf23p3L2Ka98ByYPuQUPMT-phrJX8qGvbaOH8Xhra2jfudnlyVs4SXLi-TYxF7fUqwvokkmbmS5-hA__"
                  ></img>
                </div>
              </div>
              <div className="bg-[#212226] rounded-lg shadow-md font-bold px-6 py-3">
                <h1 className="text-center">Electricidad</h1>
                <div className="flex flex-row gap-10 justify-center items-center">
                  <h1 className="text-4xl">+3,7%</h1>
                  <img
                    className="w-24 h-32 -rotate-90"
                    src="https://s3-alpha-sig.figma.com/img/0c2b/a701/d16010ba86858142f64ee0cb69aedacc?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EmZtI50-E-ZQH7-2QlZpVVq3cukRgSTRSboPkjo4Vuk4STjVeQh5rDa9SdHdNceE3Zsyqm22pZ9Z-zczbVAPC4O3DLqOt4HMMY44eVfIRx0MRM0PSasCCknYipUxVY0t1GM9N8Xk0Eexvy70DqZOC8GsFlLWmTe0AoMrZ9JtJHzTpwXEorvkVhKEShupNjdfjkASz9pjeVCudP0tvZlJ~7qxrADq4jGbXvJJ65L4R49aFtxCpd~xLnQ01ri1pWur0~kAmRuiGf23p3L2Ka98ByYPuQUPMT-phrJX8qGvbaOH8Xhra2jfudnlyVs4SXLi-TYxF7fUqwvokkmbmS5-hA__"
                  ></img>
                </div>
              </div>
            </div>

            <div className="gap-4 mt-4 flex flex-col items-center">
              <h1 className="mt-3">Genera una petición</h1>
              <Cardslider />
              <div className="flex justify-center items-center bg-black hover:bg-[#212226] border border-[#838383] h-10 mb-3 rounded-full w-50 text-[#EA5105] font-bold text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
                {" "}
                Generar Ahora
              </div>
            </div>
            <div className="font-bold my-4 mb-6">
              Resultado de la prediccion:
            </div>
            <ScrollContainer />
          </div>
          <AiSuggestionsChat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
