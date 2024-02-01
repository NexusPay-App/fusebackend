// import express, { Application, Request, Response } from 'express';

// const app: Application = express();
// const PORT = 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript Express!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
import { ethers } from "ethers";
import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import dotenv from 'dotenv';
import { parseEther, toUtf8Bytes} from "ethers/lib/utils";

dotenv.config();
const main = async () => {
    const credentials = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY as string);
    const publicApiKey = process.env.NEXT_PUBLIC_PUBLIC_API_KEY as string;
    const fuseSDK = await FuseSDK.init(publicApiKey, credentials, {
      withPaymaster: true,
    });
    console.log(`Smart Contract wallet address: ${fuseSDK.wallet.getSender()}`);

    // You can use any other "to" address and any other "value"
    // MTK Token
    const contractAddress = "0xb8D4BD32d0c8C9012cF5E90D2acF37091a73B6F6"; 
    const amount = parseEther("0");

    const contractCall = new ethers.utils.Interface([
        "function mint(uint256 amount)",
      ]);

    // const data = contractCall.encodeFunctionData("mint", [1]);
    const data = ethers.utils.toUtf8Bytes(contractCall.encodeFunctionData("mint", [1]));

    const res = await fuseSDK.callContract(contractAddress, amount, data);

    console.log(`UserOpHash: ${res?.userOpHash}`);
    console.log("Waiting for transaction...");

    const receipt = await res?.wait();
    console.log("Transaction Hash:", receipt?.transactionHash);
};

// Execute the main function
main();