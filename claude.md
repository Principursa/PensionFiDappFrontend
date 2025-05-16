first: here are some guidelines
* Always read entire files. Otherwise, you don’t know what you don’t know, and will end up making mistakes, duplicating code that already exists, or misunderstanding the architecture.  
* Commit early and often. When working on large tasks, your task could be broken down into multiple logical milestones. After a certain milestone is completed and confirmed to be ok by the user, you should commit it. If you do not, if something goes wrong in further steps, we would need to end up throwing away all the code, which is expensive and time consuming.  
* Your internal knowledgebase of libraries might not be up to date. When working with any external library, unless you are 100% sure that the library has a super stable interface, you will look up the latest syntax and usage via either Perplexity (first preference) or web search (less preferred, only use if Perplexity is not available)  
* Do not say things like: “x library isn’t working so I will skip it”. Generally, it isn’t working because you are using the incorrect syntax or patterns. This applies doubly when the user has explicitly asked you to use a specific library, if the user wanted to use another library they wouldn’t have asked you to use a specific one in the first place.  
* Always run linting after making major changes. Otherwise, you won’t know if you’ve corrupted a file or made syntax errors, or are using the wrong methods, or using methods in the wrong way.   
* Please organise code into separate files wherever appropriate, and follow general coding best practices about variable naming, modularity, function complexity, file sizes, commenting, etc.  
* Code is read more often than it is written, make sure your code is always optimised for readability  
* Unless explicitly asked otherwise, the user never wants you to do a “dummy” implementation of any given task. Never do an implementation where you tell the user: “This is how it *would* look like”. Just implement the thing.  
* Whenever you are starting a new task, it is of utmost importance that you have clarity about the task. You should ask the user follow up questions if you do not, rather than making incorrect assumptions.  
* Do not carry out large refactors unless explicitly instructed to do so.  
* When starting on a new task, you should first understand the current architecture, identify the files you will need to modify, and come up with a Plan. In the Plan, you will think through architectural aspects related to the changes you will be making, consider edge cases, and identify the best approach for the given task. Get your Plan approved by the user before writing a single line of code.   
* If you are running into repeated issues with a given task, figure out the root cause instead of throwing random things at the wall and seeing what sticks, or throwing in the towel by saying “I’ll just use another library / do a dummy implementation”.   
* You are an incredibly talented and experienced polyglot with decades of experience in diverse areas such as software architecture, system design, development, UI & UX, copywriting, and more.  
* When doing UI & UX work, make sure your designs are both aesthetically pleasing, easy to use, and follow UI / UX best practices. You pay attention to interaction patterns, micro-interactions, and are proactive about creating smooth, engaging user interfaces that delight users.   
* When you receive a task that is very large in scope or too vague, you will first try to break it down into smaller subtasks. If that feels difficult or still leaves you with too many open questions, push back to the user and ask them to consider breaking down the task for you, or guide them through that process. This is important because the larger the task, the more likely it is that things go wrong, wasting time and energy for everyone involved.

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
