"use client";
import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Cardslider from "@/components/Cardslider/Cardslider";
import AiSuggestionsChat from "@/components/AiSuggestionsChat/AiSuggestionsChat";


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black flex px-4">
      <Sidebar />
      <div className="m-10">
        <h1 className="text-xl font-bold text-white">Buenos dias Karim</h1>
        <div className="flex flex-row gap-4 mt-4">
          <div className="bg-[#212226] p-4 rounded-lg shadow-md flex font-bold gap-6 p-6">Carbono Emitido<img className='w-24 h-32 -rotate-90' src='https://s3-alpha-sig.figma.com/img/f9d6/42a3/d5a61ee10533b266be9921ed42fc868c?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pjzm9FzSUs1KBbpZFTqwl7a2oROjw70asAEq-zW1eBK~KPPaLnZtmBc3859dlIHiTfCf4kbxq2pAPCvMqU-jaq9nVCHSBwV2iM7hS224r0I77DNg0p6FLSRlRUWYwuPieZVSxuNPEsfGmasZIoAOgeFTMTHrYiREMw36LY9R5d7hK0T44kpR4NqZxJpWEmpZXhSXNOTHZY8GPvs-sWKBPcCRwyZ2PKbvJpWXdH~yYDiHFvWuGQd4D5RWwLE9B79AtSF1eT59NioEkYnXyNiLvvcPt30uGrqxRbkiaZ~GBkk3Q~Sh~9KZ9yzH2ZkM3FJg-qEdLaK1f7ut1HvXO21pXg__'></img></div>
          <div className="bg-[#212226] p-4 rounded-lg shadow-md flex font-bold gap-6 p-6">Transporte <img className='w-24 h-32 -rotate-90' src='https://s3-alpha-sig.figma.com/img/0c2b/a701/d16010ba86858142f64ee0cb69aedacc?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EmZtI50-E-ZQH7-2QlZpVVq3cukRgSTRSboPkjo4Vuk4STjVeQh5rDa9SdHdNceE3Zsyqm22pZ9Z-zczbVAPC4O3DLqOt4HMMY44eVfIRx0MRM0PSasCCknYipUxVY0t1GM9N8Xk0Eexvy70DqZOC8GsFlLWmTe0AoMrZ9JtJHzTpwXEorvkVhKEShupNjdfjkASz9pjeVCudP0tvZlJ~7qxrADq4jGbXvJJ65L4R49aFtxCpd~xLnQ01ri1pWur0~kAmRuiGf23p3L2Ka98ByYPuQUPMT-phrJX8qGvbaOH8Xhra2jfudnlyVs4SXLi-TYxF7fUqwvokkmbmS5-hA__'></img></div>
          <div className="bg-[#212226] p-4 rounded-lg shadow-md flex font-bold gap-6 p-6">Electricidad <img className='w-24 h-32 -rotate-90' src='https://s3-alpha-sig.figma.com/img/0c2b/a701/d16010ba86858142f64ee0cb69aedacc?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EmZtI50-E-ZQH7-2QlZpVVq3cukRgSTRSboPkjo4Vuk4STjVeQh5rDa9SdHdNceE3Zsyqm22pZ9Z-zczbVAPC4O3DLqOt4HMMY44eVfIRx0MRM0PSasCCknYipUxVY0t1GM9N8Xk0Eexvy70DqZOC8GsFlLWmTe0AoMrZ9JtJHzTpwXEorvkVhKEShupNjdfjkASz9pjeVCudP0tvZlJ~7qxrADq4jGbXvJJ65L4R49aFtxCpd~xLnQ01ri1pWur0~kAmRuiGf23p3L2Ka98ByYPuQUPMT-phrJX8qGvbaOH8Xhra2jfudnlyVs4SXLi-TYxF7fUqwvokkmbmS5-hA__'></img></div>
        </div>
        <div className="gap-4 mt-4 flex flex-col items-center">
          <Cardslider />
          <div className="bg-[#4C4C4C] h-8 rounded-full w-50"></div>
        </div>
        <div>Info</div>
        <div className="bg-[#212226] p-4 rounded-lg shadow-md flex font-bold gap-6 p-6 h-50"></div>
      </div>
      <div className="bg-[#212226] w-75 mt-6 mb-6 p-4 rounded-lg shadow-md flex font-bold gap-6 p-6">
        <div className="flex flex-col gap-4 justify-between">
          <div className="w-80 border-l border-gray-800 bg-black">
            <AiSuggestionsChat />
          </div>
          <div className="bg-[#4C4C4C] h-8 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
