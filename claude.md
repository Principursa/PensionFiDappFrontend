alright now i'm using this repo from another project I made before for a current project. essentially the only relevant code to this project is in the src/hooks directory and one file in abis: src/sbis/generated.ts everything in routes, assets,config, abis besides that one file is irrelevant to this current project.
that being side I would like to use the same stack for the previous project as this project. So rainbowkit,wagmi,react-router etc. you get the point it's in the package.json file.
the information below has the necessary information for this dapp.
when you are finished delete unnecessary files.

# PAGES
Nav bar with Capital Frens and buttons to Retire Now Page, check Pension page and Harvest Pension page
the routing should probably look something like this: 

<Route path="/" element={<Home />} />
<Route path="/retire" element={<RetireNow />} />
<Route path="/check" element={<CheckPension />} />
<Route path="/harvest" element={<HarvestPension />} />

2. Timestamp Logic
Make sure this logic exists somewhere accessible:

ts
Copy
Edit
const SECONDS_IN_MONTH = 30 * 24 * 60 * 60;
assets = (DistribPhaseLength / SECONDS_IN_MONTH) * AmountPerInterval;
You might want to make a small utility like calculateRequiredDeposit(amountPerMonth, months).


Global State for address
You’ll need the connected wallet address available across pages. Use:

ts
Copy
Edit
import { useAccount } from 'wagmi';
const { address } = useAccount();
Consider placing this in a context or using a simple state to avoid repeating on each page.


All useReadContract and useWriteContract hooks should expose isLoading, error, data, etc. Include UI feedback using those.

Home Page:
"You’ve come to the right place😎"
"How it works:
Set the amount of monthly income you want to receive.
Set for how long you want to retire.
Deposit required amount and sit back"

Retire Now Page:
Connect Wallet first >
use address obtained with connect wallet as msg.sender
use that address as the args in the hooks with benefactor, beneficiary and _to as args
"How much per month do you want to get paid?"
AmountPerInterval
make sure to put logic in here that converts unix timestamp to months for calling solidity function 
For how long do you want to get paid?
(slider from one month to 12 * 10 months)
DistribPhaseLength
This is how much you need to deposit: 

call useDepositStrategy hook
'assets' is the 
    function depositStrategy(
        uint256 assets,
        address to,
        uint distributionPhaseLength,
        uint distributionPhaseInterval,
        address beneficiary,
        uint strategyId
    ) public returns (uint256 shares) {

assets = DistribPhaseLength / MonthUnixTimestamp * AmountPerInterval, 
to = msg.sender,
distributionPhaseLength = distribPhaseLength,
distribPhaseInterval = monthUnixTimestamp
beneficiary = msg.sender
strategyId = 0

Check Pension Page:
first check if viewTermInfo(msg.sender,msg.sender) returns a valid plan, do that by using the useCheckPlanExistence hook in the usePensionVault.ts file
if not say "You haven't made a deposit yet, go to Deposit page to do so"
if it returns a valid plan continue with following:

"You have access to $x / mo for y months"
y = useDistributionLengthRemaining(msg.sender)
x = getAmountPerDistribInterval(msg.sender)


  
Harvest Pension Page
button "Harvest" that connects to usePayOutPlan Hook
Haven't create functionality yet that can tell how much money is able to be harvested !
