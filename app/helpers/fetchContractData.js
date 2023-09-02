export async function fetchContractData (contractId){
    let [chain,cId]=contractId.split(":");
    let fetchersByChain={
        "arweave":async ()=>{

            let contractData=await fetch(
                `https://dre-2.warp.cc/contract?id=`+cId
                ).then(r=>r.json())
                return contractData.state
        },
        "undefined":()=>undefined
    };
    return await (fetchersByChain[chain||"undefined"]||(()=>undefined))()
}