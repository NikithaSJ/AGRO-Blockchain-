pragma solidity ^0.4.17;

contract ERC20Interface {
	function totalSupply() public constant returns (uint256);
	function balanceOf(address tokenOwner) public constant returns (uint256 balance);
	function allowance(address tokenOwner, address spender) public constant returns (uint256 remaining);
	function transfer(address to, uint256 tokens) public returns (bool success);
	function approve(address spender, uint256 tokens) public returns (bool success);
	function transferFrom(address from, address to, uint256 tokens) public returns (bool success);

	event Transfer(address indexed from, address indexed to, uint tokens);
	event Approval(address indexed tokenOwner, address indexed spender, uint256 tokens);
	event errorLog(string _error);
	event FarmersMDataEvent(address owner, string fmname);
	event FarmersDataEvent(address owner, string fname);
	event RetailersDataEvent(address owner, string rname);
	event SellGoods(address farmeradd, address farmersmarketadd, uint weight, uint balfarmer, uint balfm);
	event BuyGoods(address retailersadd, address farmersmarketadd, uint weight, uint balretailer, uint balfm);


}

contract Farmers is ERC20Interface {
	string private constant NAME = "Farmers Token";
	string private constant SYMBOL = "FT";
	uint8 private constant DECIMALS = 9;
	uint256 private constant TOTAL_SUPPLY = 10**17;
	uint PriceOfWheat = 1;
	

	mapping(address => uint256) balances;
	mapping(address => mapping(address => uint256)) allowed;
	//address[] private Comb_Locale
	
	 struct FarmersDetails{
	    address FarmersAddress;
        string FarmersName;
    }
    
    struct FarmersMDetails{
	    address FarmersMAddress;
        string FarmersMName;
        uint WeightofCrop;
    }
    
    struct RetailersDetails{
	    address RetailersAddress;
        string RetailersName;
    }
    
    mapping(address => FarmersMDetails) public FarmersMData;
    mapping(address => FarmersDetails) public FarmersData;
    mapping(address => RetailersDetails) public RetailersData;


	

	constructor() public{
		balances[msg.sender] = 10**17;
	}

	function name() public pure returns (string) {
		return NAME;
	}

	function symbol() public pure returns (string) {
		return SYMBOL;
	}

	function decimals() public pure returns (uint8) {
		return DECIMALS;
	}

	function totalSupply() public view returns (uint256) {
		return TOTAL_SUPPLY;
	}

	function balanceOf(address tokenOwner) public view returns (uint256 balance) {
		return balances[tokenOwner];
	}

	function allowance(address tokenOwner, address spender) public view returns (uint256 remaining) {
		return allowed[tokenOwner][spender];
	}
	function approve(address spender, uint256 tokens) public returns (bool success) {
	    //Eventually, I'd like a better address check
	    if (spender == 0) {
	        return false;
	    }
		allowed[msg.sender][spender] = tokens;

		//Fire the approval event so the network knows the amount is approved for spender
		emit Approval(msg.sender, spender, tokens);
		
		return true;
	}

	function transfer(address to, uint256 tokens) public returns (bool success) {
		if (balances[msg.sender] < tokens || tokens ==  0) {
			return false;
		}

		balances[msg.sender] -= tokens;
		balances[to] += tokens;

		//Fire the transfer event to let the network know a transfer has taken place.
		emit Transfer(msg.sender, to, tokens);

		return true;
	}


	function transferFrom(address from, address to, uint256 tokens) public returns (bool sucess) {
		if (balances[from] < tokens || allowed[from][msg.sender] < tokens || tokens < 0) {
			return false;
		}

		balances[to] += tokens;
		balances[from] -= tokens;
		allowed[from][msg.sender] -= tokens;
		emit Transfer(from, to, tokens);

		return true;
	}
	
	function AddFarmersMarketData(address owner, string _FarmersMName) public {
        
        if(FarmersMData[owner].FarmersMAddress == owner){
            emit errorLog("Farmer Market is Registered!");
            
        }
        else{
            FarmersMData[owner] = FarmersMDetails( owner, _FarmersMName, 0);
            emit FarmersMDataEvent(owner,_FarmersMName);
        }
        
    }
    
	function AddFarmersData( address _FarmersAddress, string _FarmersName) public {
        
        if(FarmersData[_FarmersAddress].FarmersAddress == _FarmersAddress){
            emit errorLog("Farmer is Registered!");
        }
        else{
            FarmersData[_FarmersAddress] = FarmersDetails( _FarmersAddress, _FarmersName);
            emit FarmersDataEvent(_FarmersAddress,_FarmersName);
        }
        
    }
    
    function AddRetailerData(address _RetailersAddress, string _RetailersName) public {
        
        if(RetailersData[_RetailersAddress].RetailersAddress == _RetailersAddress){
            emit errorLog("Retailer is Registered!");
        }
        else{
            RetailersData[_RetailersAddress] = RetailersDetails( _RetailersAddress, _RetailersName);
            emit RetailersDataEvent(_RetailersAddress, _RetailersName);
        }
        
    }
    
    function FarmersMarketSell(address owner, address _FarmersAddress, uint _weight) public{
        uint256 TotalAmount;
        TotalAmount = _weight * PriceOfWheat * 90/100;
        
        if (balances[owner] < TotalAmount || TotalAmount ==  0) {
			emit errorLog("Please enter valid amount");
		}
        else{
            balances[owner] -= TotalAmount;
    		balances[_FarmersAddress] += TotalAmount;
            
            FarmersMData[owner].WeightofCrop += _weight;
    		//Fire the transfer event to let the network know a transfer has taken place.
    		emit Transfer(msg.sender, _FarmersAddress, TotalAmount);
    		emit SellGoods(_FarmersAddress, owner, _weight, balances[_FarmersAddress] , balances[owner]);
        }
		
    }
    
    function RetailersMarketBuy(address owner, address _RetailersAddress, uint _weight) public{
        uint256 TotalAmount;
        TotalAmount = _weight * PriceOfWheat * 110/100;
        
        if (balances[owner] < TotalAmount || TotalAmount ==  0 || FarmersMData[owner].WeightofCrop <= _weight ) {
			emit errorLog("Please enter valid amount of weight!");
		}
        else{
            balances[_RetailersAddress] -= TotalAmount;
    		balances[owner] += TotalAmount;
            FarmersMData[owner].WeightofCrop -= _weight;
    		//Fire the transfer event to let the network know a transfer has taken place.
    		emit Transfer(msg.sender, _RetailersAddress, TotalAmount);
    		emit BuyGoods(owner, _RetailersAddress, _weight, balances[_RetailersAddress], balances[owner]);
        }
    }
	


}
