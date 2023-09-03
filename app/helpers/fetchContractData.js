
import daQuizMeta from "../daQuiz.json";

export async function fetchContractData (contractId){
    let [chain,cId]=contractId.split(":");
    let fetchersByChain={
        "arweave":async ()=>{

            let contractData=await fetch(
                `https://dre-2.warp.cc/contract?id=`+cId
                ).then(r=>r.json())
                return {...contractData.state,id:cId,ogId:contractId}
        },
        "alephzero": async ()=> {
            const wsProvider = new WsProvider("wss://ws.test.azero.dev");
            const api = await ApiPromise.create({ provider: wsProvider });
            const { alephWallet } = window;
            
            const contract = new ContractPromise(api, daQuizMeta, cid);
            const gasLimit = 3E9;
            const storageDepositLimit = null;
            const meta = await contract.query.getMetadata({
                gasLimit,
                storageDepositLimit,
                }
            );
            const entries = await contract.query.getEntries([], {
                gasLimit,
                storageDepositLimit,
                }
            );
            const questions = await contract.query.getQuestions({
                gasLimit,
                storageDepositLimit,
                }
            );
            const data = {
                id: cid,
                metadata: meta.result,
                entries: entries.result,
                questions: questions.result
            };

            console.log(data);

            return data;
        },
        "undefined":()=>undefined
    };
    return await (fetchersByChain[chain||"undefined"]||(()=>undefined))()
}